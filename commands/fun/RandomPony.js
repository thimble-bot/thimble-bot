const { Command } = require('discord.js-commando');
const dinky = require('dinky.js');

const meta = {
  name: 'randompony',
  aliases: [ 'pony', 'randommlp', 'mlprandom', 'mlp', 'derpi' ],
  description: 'Get a random pony picture or GIF. Uses the Derpibooru search syntax: https://derpibooru.org/search/syntax',
  args: [
    {
      key: 'query',
      type: 'string',
      default: '',
      prompt: 'Provide query.'
    }
  ]
};

class RandomPonyCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'randompony',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });

    this.filteredKeywords = [
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
  }

  queryHasNSFW(query) {
    query = query.split(' ').join('').toLowerCase();

    return new Promise(resolve => {
      this.filteredKeywords.forEach(keyword => {
        if (query.toLowerCase().includes(keyword)) {
          return resolve(true);
        }
      });

      return resolve(false);
    });
  }

  generateKeywords(query, isChannelNSFW, isChannelDM, queryHasNSFW) {
    const split = query.split(/[,(&&)]+/).map(k => k.trim());
    return (isChannelNSFW && !isChannelDM) || (isChannelDM && queryHasNSFW)
      ? split
      : [ 'safe', ...split ];
  }

  getFileName(src) {
    return `${src.id}.${src.image.split('.').pop()}`;
  }

  async run(message, { query }) {
    const isChannelNSFW = message.channel.nsfw || !message.guild;
    const queryHasNSFW = query && await this.queryHasNSFW(query);

    if (!isChannelNSFW && queryHasNSFW) {
      return message.say(':x: You cannot ask for NSFW results in a SFW channel.');
    }

    const waiting = await message.say('Fetching cartoon horses...');

    const keywords = query
      ? this.generateKeywords(query, isChannelNSFW, !message.guild, queryHasNSFW)
      : [ 'safe' ];

    // search uses "Everything" filter to include NSFW results where necessary
    const search = dinky({ filter: 56027 }).search(keywords);

    try {
      const random = await search.random();

      if (!random) {
        return waiting.edit(':warning: No results found for your query.');
      }

      await message.say('', {
        file: {
          attachment: `https:${random.image}`,
          name: this.getFileName(random)
        }
      });

      return waiting.delete();
    } catch (err) {
      return waiting.edit(':x: Failed to fetch image.');
    }
  }
};

module.exports = RandomPonyCommand;
module.exports.meta = meta;
