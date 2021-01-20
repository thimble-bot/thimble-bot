import { Message } from 'discord.js';
import { handleExperience } from '../lib/experience';
import { IThimbleBot } from '../typings/thimblebot';

const onMessage = (message: Message) => {
  if (message.author.bot) {
    return;
  }

  const client = message.client as IThimbleBot;
  const guild = message.guild;
  const channel = message.channel;
  const sender = message.author;

  if (guild) {
    handleExperience({ client, guild, channel, sender });
  }
};

export default onMessage;
