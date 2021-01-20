import { Command } from 'discord-akairo';
import { Message, Guild, User, MessageEmbed } from 'discord.js';
import config from '../../config';
import { error } from '../../lib/serviceMessages';
import { Experience } from '../../models/Experience';

class EXPCommand extends Command {
  constructor() {
    super('exp', {
      aliases: [ 'exp', 'xp' ],
      description: 'Get your current experience level.',
      channel: 'guild'
    });
  }

  generateEmbed(user: User, exp: number, nextLevelExp: number | undefined) {
    const avatar = user.avatarURL();

    const embed = new MessageEmbed();
    embed.setTitle(user.username);

    if (avatar) {
      embed.setThumbnail(avatar);
    }

    embed.addField('Total', exp, true);
    embed.addField('Next At', nextLevelExp || 'N/A', true);
    embed.setFooter(`Experience data updates every ${config.bot.expUpdateInterval} minutes.`);

    return embed;
  }

  async exec(message: Message) {
    const guild = message.guild as Guild;
    const guildExpConfig = config.guilds[guild.id]?.exp;

    if (!guildExpConfig) {
      return message.channel.send(error('Experience system is not enabled for this server.'));
    }

    const member = message.author;

    try {
      const experienceSnapshot = await Experience.findOne({
        guild: guild.id,
        member: member.id
      });

      let exp = 0;

      if (experienceSnapshot) {
        exp = experienceSnapshot.data().amount;
      }

      const nextLevelExp = Object.keys(guildExpConfig.levels)
        .find(required => parseInt(required) > exp);

      const embed = this.generateEmbed(member, exp, nextLevelExp ? parseInt(nextLevelExp) : undefined);
      return message.channel.send(embed);
    } catch (err) {
      return message.channel.send(error('Failed to fetch experience data.'));
    }
  }
}

export default EXPCommand;
