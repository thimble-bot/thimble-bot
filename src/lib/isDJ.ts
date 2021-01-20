import { GuildMember } from 'discord.js';
import config from '../config';

const isDJ = (member: GuildMember): boolean => {
  const guild = member.guild.id;
  const guildConfig = config.guilds?.[guild];

  if (!guildConfig?.djRole) {
    return true;
  }

  if (member.hasPermission('MANAGE_CHANNELS') && member.hasPermission('MANAGE_MESSAGES')) {
    return true;
  }

  return member.roles.cache.some(role => role.name === guildConfig.djRole);
};

export default isDJ;
