const { Command } = require('discord.js-commando');

class HyphenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hyphen',
      group: 'fun',
      memberName: 'hyphen',
      description: 'Place the hyphen one word to the right in every [adjective]-ass [noun] sequence. https://xkcd.com/37/',
      aliases: [ 'xkcd37' ],
      args: [
        {
          key: 'sentence',
          type: 'string',
          prompt: 'Please provide a sentence.'
        }
      ]
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
