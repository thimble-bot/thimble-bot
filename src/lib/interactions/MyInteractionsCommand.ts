import { Command } from '../../command';
import { CommandOptions } from 'discord-akairo';
import { Message, MessageEmbed, Guild, User } from 'discord.js';
import { generateLeaderboard, getInteractionsForMember, getMemberInteractions } from '../interaction';
import fmt from '../fmt';
import { InteractionType } from '../../models/Interaction';

class MyInteractionsCommand extends Command {
  type: InteractionType;

  embedTitle: string = '%s %s';
  topSendersTitle: string = '';
  topReceiversTitle: string = '';
  noSenders: string = '';
  noReceivers: string = '';

  constructor(id: InteractionType, opts: CommandOptions) {
    super(`my-${id}`, {
      ...opts,
      channel: 'guild'
    });

    this.type = id;
  }

  generateEmbed(guild: Guild, user: User, senders: string[], receivers: string[]): MessageEmbed {
    const embed = new MessageEmbed();

    const sendersString = senders.length
      ? senders.join('\n')
      : this.noSenders;

    const receiversString = receivers.length
      ? receivers.join('\n')
      : this.noReceivers;

    embed.setTitle(fmt(this.embedTitle, user.username, guild.name));
    embed.setAuthor(this.client.user?.tag, this.client.user?.avatarURL() || undefined);
    embed.addField(this.topSendersTitle, sendersString, true);
    embed.addField(this.topReceiversTitle, receiversString, true);
    embed.setTimestamp(new Date());
    embed.setFooter('<3');

    return embed;
  }

  async exec(message: Message) {
    try {
      const guild = message.guild as Guild;
      const user = message.author.id;

      const from = await getInteractionsForMember(guild.id, user, this.type);
      const to = await getMemberInteractions(guild.id, user, this.type);

      const { senders } = generateLeaderboard(message, from, { ignoreReceivers: true });
      const { receivers } = generateLeaderboard(message, to, { ignoreSenders: true });

      const embed = this.generateEmbed(guild, message.author, senders, receivers);
      return this.say(message, embed);
    } catch (err) {
      console.error(err);
      return this.error(message, 'Failed to fetch the leaderboard.');
    }
  }
}

export default MyInteractionsCommand;
