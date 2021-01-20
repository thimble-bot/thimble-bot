import { MessageEmbed } from 'discord.js';

const logEmbed = (level: 'info' | 'error' | 'warn' | 'success', input: string | string[]): MessageEmbed => {
  const colors = {
    info: 0x1E88E5,
    error: 0xE53935,
    warn: 0xFB8C00,
    success: 0x43A047
  };

  const titles = {
    info: ':information_source: Information',
    error: ':x: Error',
    warn: ':warning: Warning',
    success: ':white_check_mark: Success'
  };

  if (typeof input !== 'string') {
    input = input.join(' ');
  }

  const embed = new MessageEmbed();
  embed.setColor(colors[level]);
  embed.setTitle(titles[level]);
  embed.setDescription(input);
  return embed;
};

const info = (input: string | string[]): MessageEmbed => logEmbed('info', input);
const error = (input: string | string[]): MessageEmbed => logEmbed('error', input);
const warn = (input: string | string[]): MessageEmbed => logEmbed('warn', input);
const success = (input: string | string[]): MessageEmbed => logEmbed('success', input);

const UNEXPECTED_ERROR = 'An unexpected error happened.';

export {
  info,
  error,
  warn,
  success,
  UNEXPECTED_ERROR
};
