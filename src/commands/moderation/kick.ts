import { Command } from '../../command';
import { Message, GuildMember } from 'discord.js';

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
      return this.info(message, 'Nice try, you can\'t kick me though!');
    }

    if (member.user === message.author) {
      return this.info(message, 'You don\'t just kick yourself from the server...');
    }

    return member.kick(reason)
      .then(() => this.success(message, `${member} kicked successfully!`))
      .catch(() => this.error(message, `Failed to kick ${member}.`));
  }
}

export default KickCommand;
