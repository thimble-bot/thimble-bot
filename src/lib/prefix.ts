import { Message } from 'discord.js';
import config from '../config';

const prefix = (message: Message | null, commandPrefix: string = ''): string => {
  if (message === null) {
    return `.${commandPrefix}`;
  }

  if (message.guild) {
    const guild = message.guild.id;

    const guildPrefix = config.guilds?.[guild]?.prefix;

    if (guildPrefix) {
      return `${guildPrefix}${commandPrefix}`;
    }
  }

  return config.bot.defaultPrefix
    ? `${config.bot.defaultPrefix}${commandPrefix}`
    : `.${commandPrefix}`;
};

export default prefix;
