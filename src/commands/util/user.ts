import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';

import { format as dateFormat } from 'date-fns';
import { error } from '../../lib/serviceMessages';

class UserCommand extends Command {
  constructor() {
    super('user', {
      aliases: [ 'user', 'userinfo', 'u', 'profile' ],
      description: {
        detail: 'Get some basic information about the specified user.',
        examples: [
          '`user @someone#1234` - Retrieve the information based on a DiscordTag',
          '`user someone` - Retrieve the information based on a username/nickname',
          '`user` - Retrieve information about your own account'
        ]
      },
      args: [
        {
          id: 'user',
          type: 'user',
          prompt: {
            retry: error('Invalid user provided.'),
            optional: true
          },
          default: (message: Message) => message.author
        }
      ]
    });
  }

  exec(message: Message, { user }: { user: User }) {
    const embed = new MessageEmbed();

    embed.setTitle(`${user.username} - information`);
    embed.setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL() || user.defaultAvatarURL);
    embed.setThumbnail(user.avatarURL({ size: 512, format: 'png', dynamic: true }) || user.defaultAvatarURL);

    embed.addField('Username', user.username);
    embed.addField('Discriminator', user.discriminator);
    embed.addField('Joined Discord', dateFormat(user.createdAt, 'EEEE, MMMM d, yyyy h:mm a'));
    embed.addField('User ID', user.id);

    embed.setTimestamp(new Date());
    embed.setFooter('<3');

    return message.channel.send(embed);
  }
}

export default UserCommand;
