import { Command, CommandOptions } from 'discord-akairo';
import { Message, MessageEmbed, Guild } from 'discord.js';
import { InteractionType } from '../../models/Interaction';
import { generateLeaderboard, getGuildInteractions } from '../interaction';
import { error } from '../serviceMessages';
import fmt from '../fmt';

class InteractionLeaderboardCommand extends Command {
  type: InteractionType;

  embedTitle: string = '%%';
  topReceiversTitle: string = '';
  topSendersTitle: string = '';
  emptyListString: string = '';

  constructor(id: InteractionType, opts: CommandOptions) {
    super(`${id}-leaderboard`, {
      ...opts,
      channel: 'guild'
    });

    this.type = id;
  }

  generateEmbed(guild: Guild, receivers: string[], senders: string[]): MessageEmbed {
    const embed = new MessageEmbed();

    embed.setTitle(fmt(this.embedTitle, guild.name));
    embed.setAuthor(this.client.user?.tag, this.client.user?.avatarURL() || undefined);
    embed.addField(this.topReceiversTitle, receivers.join('\n'), true);
    embed.addField(this.topSendersTitle, senders.join('\n'), true);
    embed.setTimestamp(new Date());
    embed.setFooter('<3');

    return embed;
  }

  async exec(message: Message) {
    try {
      const guild = message.guild?.id as string;
      const interactions = await getGuildInteractions(guild, this.type);

      if (!interactions.length) {
        return message.channel.send(this.emptyListString);
      }

      const { receivers, senders } = generateLeaderboard(message, interactions);
      const embed = this.generateEmbed(message.guild as Guild, receivers, senders);

      return message.channel.send(embed);
    } catch (err) {
      console.error(err);
      return message.channel.send(error('Failed to fetch the leaderboard.'));
    }
  }
}

export default InteractionLeaderboardCommand;
