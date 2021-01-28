import { Command as AkairoCommand } from 'discord-akairo';
import {
  Message,
  APIMessageContentResolvable,
  MessageOptions,
  MessageAdditions
} from 'discord.js';

import { success, error, warn, info } from './lib/serviceMessages';

class Command extends AkairoCommand {
  async say(
    message: Message,
    content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions
  ): Promise<Message> {
    return message.channel.send(content);
  }

  async success(message: Message, content: string): Promise<Message> {
    return message.channel.send(success(content));
  }

  async error(message: Message, content: string): Promise<Message> {
    return message.channel.send(error(content));
  }

  async warn(message: Message, content: string): Promise<Message> {
    return message.channel.send(warn(content));
  }

  async info(message: Message, content: string): Promise<Message> {
    return message.channel.send(info(content));
  }
};

export {
  Command
};
