import { Guild, Channel, User } from 'discord.js';
import config from '../config';
import { Experience, IExperience } from '../models/Experience';
import { GuildConfig } from '../typings/config';
import { IThimbleBot } from '../typings/thimblebot';

interface HandleExperienceOpts {
  client: IThimbleBot;
  guild: Guild;
  channel: Channel;
  sender: User;
};

const randomExp = (guildConfig: GuildConfig): number => {
  if (!guildConfig.exp) {
    return 0;
  }

  return guildConfig.exp.range[0] + Math.floor(Math.random() * guildConfig.exp.range[1]);
};

const updateExperience = async (opts: IExperience): Promise<number> => {
  const { member, guild, amount } = opts;
  const experience = await Experience.findOne({
    member,
    guild
  });

  if (!experience) {
    const newData = new Experience({ member, guild, amount });
    await newData.create();
    return amount;
  }

  const newAmount = experience.data().amount + amount;
  await experience.ref.update({ member, guild, amount: newAmount });

  return newAmount;
};

const handleExperience = (opts: HandleExperienceOpts) => {
  const { client, guild, channel, sender } = opts;
  const guildConfig = config.guilds?.[guild.id];

  if (!guildConfig?.exp) {
    return;
  }

  if (guildConfig.exp.ignoreChannels?.includes(channel.id)) {
    return;
  }

  if (!client.experienceMap[guild.id]) {
    client.experienceMap[guild.id] = {};
  }

  if (!client.experienceMap[guild.id][sender.id]) {
    client.experienceMap[guild.id][sender.id] = 0;
  }

  client.experienceMap[guild.id][sender.id] += randomExp(guildConfig);
};

export {
  updateExperience,
  handleExperience
};
