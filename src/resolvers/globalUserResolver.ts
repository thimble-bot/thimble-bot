import { User, Message } from 'discord.js';
import { IThimbleBot } from '../typings/thimblebot';

import partialMemberResolver from './partialMemberResolver';

const globalUserResolver = (client: IThimbleBot) => {
  const resolver = async (message: Message, phrase: string): Promise<User | null> => {
    const resolveUser = client.commandHandler.resolver.type('user');

    const user = await resolveUser(message, phrase);
    if (user) {
      return user;
    }

    if (message.guild) {
      const member = await partialMemberResolver(message, phrase);
      if (member) {
        return member.user;
      }
    }

    try {
      const globalUser = await message.client.users.fetch(phrase);
      if (globalUser) {
        return globalUser;
      }

      return null;
    } catch (err) {
      return null;
    }
  };

  return resolver;
};

export default globalUserResolver;
