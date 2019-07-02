const { Command } = require('discord.js-commando');

const meta = {
  name: 'hyphen',
  description: 'Place the hyphen one word to the right in every [adjective]-ass [noun] sequence. https://xkcd.com/37/',
  aliases: [ 'xkcd37' ],
  args: [
    {
      key: 'sentence',
      type: 'string',
      prompt: 'Please provide a sentence.'
    }
  ],
  examples: [
    '`hyphen That is a big-ass cake` - will be turned into "That is a big ass-cake"'
  ]
};

class HyphenCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'hyphen'
    });
  }

  run(message, { sentence }) {
    const split = sentence.split('-ass');

    if (!sentence.includes('-ass') || split.length !== 2 || !split.join('')) {
      return message.say(':warning: Please provide a valid `[adjective]-ass [noun]` sequence.');
    }

    split[1] = split[1].replace(' ', '-');
    return message.say(split.join(' ass'));
  }
};

module.exports = HyphenCommand;
module.exports.meta = meta;
