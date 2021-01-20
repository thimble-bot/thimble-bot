import { Command } from 'discord-akairo';
import { Message, GuildMember, User, MessageAttachment } from 'discord.js';
import { error, success, warn } from '../../lib/serviceMessages';

class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: [ 'avatar' ],
      channel: 'guild',
      description: {
        detail: 'Get the avatar of a certain user.',
        examples: [
          '`avatar @someone#1234` - Get someone\'s avatar based on their DiscordTag',
          '`avatar someone` - Get someone\'s avatar based on their username/nickname',
          '`avatar` - Get your own avatar'
        ]
      },
      args: [
        {
          id: 'members',
          type: 'partialMembers',
          match: 'content',
          prompt: {
            retry: error([
              'Failed to find a member. Please try again!',
              'Make sure to type only the member\'s name (without the command).',
              'Type `cancel` to cancel the command. The command will be cancelled automatically in 30 seconds.'
            ]),

            timeout: warn('Command timed out.'),
            cancel: success('Command cancelled.'),

            optional: true,
            retries: Infinity
          },
          default: (message: Message) => message.member
        }
      ]
    });
  }

  private extension(str: string): string {
    const extensionWithQueryParams = str.split('.').pop();

    if (!extensionWithQueryParams) {
      // shouldn't normally happen, but we gotta make sure.
      return 'png';
    }

    return extensionWithQueryParams.split('?').shift() || 'png';
  }

  private generateAttachment(user: User): MessageAttachment | null {
    const avatar = user.avatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    });

    if (!avatar) {
      return null;
    }

    return new MessageAttachment(avatar, `avatar.${this.extension(avatar)}`);
  }

  exec(message: Message, { members }: { members: GuildMember[] }) {
    if (members.length > 1) {
      return message.channel.send(
        warn('Too many users have been found for your input. Please try running the command again, but this time be more specific!')
      );
    }

    const member = members[0];

    const attachment = this.generateAttachment(member.user);
    if (!attachment) {
      return message.channel.send(warn('The specified user does not have an avatar.'));
    }

    return message.channel.send(attachment);
  }
}

export default AvatarCommand;
