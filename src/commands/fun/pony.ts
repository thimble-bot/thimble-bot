import { Command } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';

import dinky, { responses } from 'dinky.js';
import { error, warn } from '../../lib/serviceMessages';
import truncate from '../../lib/truncate';

interface PonyCommandArgs {
  query: string;
}

class PonyCommand extends Command {
  private filteredKeywords: string[] = [
    'explicit',
    'questionable',
    'suggestive',
    'notsafe',
    '!safe',
    'abuse',
    'nazi',
    'communism',
    'grimdark',
    'semi-grimdark',
    'grotesque'
  ];

  constructor() {
    super('pony', {
      aliases: [ 'pony', 'randompony', 'derpi', 'mlp' ],
      description: 'Get a random pony picture or GIF. Uses the Derpibooru search syntax: <https://derpibooru.org/search/syntax>',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ],
      args: [
        {
          id: 'query',
          match: 'content'
        }
      ]
    });
  }

  private queryHasNSFW(query: string): boolean {
    query = query.split(' ').join('').toLowerCase();

    return this.filteredKeywords.some(keyword => query.includes(keyword));
  }

  private generateKeywords(query: string, isChannelNSFW: boolean, isChannelDM: boolean, queryHasNSFW: boolean): string[] {
    const split = query.split(/[,(&&)]+/).map(k => k.trim());
    return (isChannelNSFW && !isChannelDM) || (isChannelDM && queryHasNSFW)
      ? split
      : ['safe', ...split];
  }

  private generateEmbed(image: responses.Image): MessageEmbed {
    const embed = new MessageEmbed();
    embed.setTitle(`#${image.id}`);
    embed.setURL(`https://derpibooru.org/${image.id}`);
    embed.setImage(image.representations.full);

    embed.addField('Tags', truncate(image.tags.join(', '), 1024));
    embed.addField('Uploader', image.uploader || 'Background Pony');
    embed.addField('Score (up/down)', `${image.score} (${image.upvotes}/${image.downvotes})`, true);
    embed.addField('Comments', image.commentCount, true);
    embed.addField('Width', image.width, true);
    embed.addField('Height', image.height, true);

    return embed;
  }

  async exec(message: Message, { query }: PonyCommandArgs) {
    let silent = false;

    if (query.startsWith('-s ')) {
      silent = true;
      query = query.slice(3);
    }

    if (query.trim().length === 0) {
      return message.channel.send(error('Please provide a search query.'));
    }

    const channel = message.channel as TextChannel;
    const isChannelNSFW = channel.nsfw || !message.guild;
    const queryHasNSFW = query && this.queryHasNSFW(query);

    if (!isChannelNSFW && queryHasNSFW) {
      return message.channel.send(error('You cannot ask for NSFW results in an SFW channel.'));
    }

    const keywords = query
      ? this.generateKeywords(query, isChannelNSFW, !message.guild, !!queryHasNSFW)
      : [ 'safe' ];

    // search uses "Everything" filter to include NSFW results where necessary
    const search = dinky({ filter: 56027 }).search(keywords);

    try {
      const random = await search.random().limit(1);

      if (!random?.images?.length) {
        return message.channel.send(warn('No results found for your query.'));
      }

      const image = random.images[0];

      if (silent) {
        return message.channel.send(image.representations.full);
      }

      return message.channel.send(this.generateEmbed(image));
    } catch (err) {
      return message.channel.send(error(`Failed to fetch image: \`${err.message}\`.`));
    }
  }
}

export default PonyCommand;
