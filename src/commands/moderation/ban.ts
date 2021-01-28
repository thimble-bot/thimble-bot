import { Command } from '../../command';
import { Message, GuildMember } from 'discord.js';

interface BanCommandArgs {
  member: GuildMember;
  reason?: string;
}

class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: [ 'ban' ],
      channel: 'guild',
      userPermissions: [ 'BAN_MEMBERS' ],
      clientPermissions: [ 'BAN_MEMBERS' ],
      description: 'Ban a member.',
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to ban?'
          }
        },
        {
          id: 'reason',
          match: 'content'
        }
      ]
    });
  }

  exec(message: Message, { member, reason }: BanCommandArgs) {
    if (member.user === this.client.user) {
      return this.info(message, 'Nice try, you can\'t ban me though!');
    }

    if (member.user === message.author) {
      return this.info(message, 'You don\'t just ban yourself from the server...');
    }

    return member.ban({ reason })
      .then(() => this.success(message, `${member} banned successfully!`))
      .catch(() => this.error(message, `Failed to ban ${member}.`));
  }
}

export default BanCommand;
