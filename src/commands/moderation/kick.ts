import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import { error, success } from '../../lib/serviceMessages';

interface KickCommandArgs {
  member: GuildMember;
  reason?: string;
}

class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: [ 'kick' ],
      channel: 'guild',
      userPermissions: [ 'KICK_MEMBERS' ],
      clientPermissions: [ 'KICK_MEMBERS' ],
      description: 'Kick a member.',
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to kick?'
          }
        },
        {
          id: 'reason',
          match: 'content'
        }
      ]
    });
  }

  exec(message: Message, { member, reason }: KickCommandArgs) {
    if (member.user === this.client.user) {
      return message.channel.send('Nice try, you can\'t kick me though!');
    }

    if (member.user === message.author) {
      return message.channel.send('You don\'t just kick yourself from the server...');
    }

    return member.kick(reason)
      .then(() => message.channel.send(success(`${member} kicked successfully!`)))
      .catch(() => message.channel.send(error(`Failed to kick ${member}.`)));
  }
}

export default KickCommand;
