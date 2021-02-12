import config from '../config';

import { updateExperience } from '../lib/experience';
import { initGuildConfigs } from '../lib/guildConfig';
import { IThimbleBot } from '../typings/thimblebot';

type Handler = () => void;

const onReady = (client: IThimbleBot): Handler => {
  const handler = () => {
    if (config.bot.activity) {
      client.user?.setActivity(config.bot.activity);
    }

    console.log('Bot started successfully.');
  };

  setInterval(async () => {
    for (const guild of Object.keys(client.experienceMap)) {
      const targetGuild = client.guilds.cache.get(guild);

      if (!targetGuild) {
        // bot couldn't find the guild
        continue;
      }

      if (!config.guilds[guild]) {
        // guild is not configured
        continue;
      }

      const guildExpConfig = config.guilds[guild].exp;

      if (!guildExpConfig) {
        // guild does not have an exp configuration
        continue;
      }

      for await (const member of Object.keys(client.experienceMap[guild])) {
        const targetMember = targetGuild.members.cache.get(member);

        if (!targetMember) {
          // bot couldn't find the member in the guild
          continue;
        }

        const amount = client.experienceMap[guild][member];
        const newAmount = await updateExperience({ guild, member, amount });

        for await (const level of guildExpConfig.levels) {
          const targetRole = targetGuild.roles.cache.find(role => role.id === level.roleId);

          if (!targetRole) {
            // bot couldn't find this role
            continue;
          }

          const memberHasRole = targetMember.roles.cache.has(targetRole.id);

          if (newAmount < level.amount && memberHasRole) {
            // member's exp count became smaller, remove the role
            await targetMember.roles.remove(targetRole);
            continue;
          }

          if (memberHasRole) {
            // member already has this role, no need to re-add the role
            continue;
          }

          if (newAmount >= level.amount) {
            // member has enough exp to get the role, give it to them
            await targetMember.roles.add(targetRole);
          }
        }
      }

      client.experienceMap[guild] = {};
    }
  }, (config.bot.expUpdateInterval || 5) * 1000 * 60);

  setInterval(async () => {
    await initGuildConfigs();
  }, (config.bot.guildConfigUpdateInterval || 5) * 1000 * 60);

  return handler;
};

export default onReady;
