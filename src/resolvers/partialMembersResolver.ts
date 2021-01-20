import { Message, GuildMember } from 'discord.js';

const filterMembers = (member: GuildMember, phrase: string): boolean => {
  if (member.user.id === phrase) {
    return true;
  }

  if (member.user.toString() === phrase.replace('!', '')) {
    // hacky, but works; tell me a bettr way
    return true;
  }

  if (member.nickname && member.nickname.toLowerCase().includes(phrase.toLowerCase())) {
    return true;
  }

  if (member.user.username.toLowerCase().includes(phrase.toLowerCase())) {
    return true;
  }

  return false;
};

const partialMembersResolver = async (message: Message, phrase: string): Promise<GuildMember[] | null> => {
  if (!phrase) {
    return null;
  }

  if (!message.guild) {
    return null;
  }

  let foundMembers = message.guild.members.cache.filter(member => filterMembers(member, phrase));

  if (!foundMembers.size) {
    const allMembers = await message.guild.members.fetch();
    foundMembers = allMembers.filter(member => filterMembers(member, phrase));
  }

  const results = foundMembers.array();

  if (results.length === 0) {
    return null;
  }

  return results;
};

export default partialMembersResolver;
