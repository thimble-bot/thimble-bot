import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import { error, success } from '../../lib/serviceMessages';

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
      return message.channel.send('Nice try, you can\'t ban me though!');
    }

    if (member.user === message.author) {
      return message.channel.send('You don\'t just ban yourself from the server...');
    }

    return member.ban({ reason })
      .then(() => message.channel.send(success(`${member} banned successfully!`)))
      .catch(() => message.channel.send(error(`Failed to ban ${member}.`)));
  }
}

export default BanCommand;
