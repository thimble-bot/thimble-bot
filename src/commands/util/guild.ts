import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Guild } from 'discord.js';

import { format as dateFormat } from 'date-fns';

class GuildCommand extends Command {
  constructor() {
    super('guild', {
      aliases: [ 'guild', 'server', 'guildinfo', 'serverinfo' ],
      description: 'Get some information about the current server.',
      channel: 'guild'
    });
  }

  exec(message: Message) {
    const guild = message.guild as Guild;

    const embed = new MessageEmbed();
    embed.setTitle(guild.name);
    embed.setAuthor(this.client.user?.username, this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL);

    const icon = guild.iconURL({ format: 'png', size: 512, dynamic: true });
    if (icon) {
      embed.setThumbnail(icon);
    }

    embed.addField('ID', guild.id);
    embed.addField('Created at', dateFormat(guild.createdAt, 'EEEE, MMMM d, yyyy h:mm a'));
    embed.addField('Member count', guild.memberCount, true);
    embed.addField('Channel count', guild.channels.cache.size, true);
    embed.addField('Emote count', guild.emojis.cache.size, true);
    embed.addField('Region', guild.region, true);
    embed.addField('Owner', guild.owner?.toString() || 'unknown', true);

    embed.setTimestamp(new Date());
    embed.setFooter('<3');

    return message.channel.send(embed);
  }
}

export default GuildCommand;
