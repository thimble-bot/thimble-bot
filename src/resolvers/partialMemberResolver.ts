import { GuildMember, Message } from 'discord.js';
import partialMembersResolver from './partialMembersResolver';

const partialMemberResolver = async (message: Message, phrase: string): Promise<GuildMember | null> => {
  const members = await partialMembersResolver(message, phrase);
  return members && members.length
    ? members[0]
    : null;
};

export default partialMemberResolver;
