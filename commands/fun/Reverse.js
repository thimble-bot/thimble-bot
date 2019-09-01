const { Command } = require('discord.js-commando');

const meta = {
  name: 'reverse',
  description: 'Get the reverse of a given string.',
  examples: [ '`reverse Thimble` - will return "elbmihT"' ],
  args: [
    {
      key: 'text',
      prompt: 'What text do you want me to reverse?',
      type: 'string'
    }
  ]
};

class Reverse extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'reverse'
    });
  }

  clean(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
  }

  async run(message, { text }) {
    const reverse = text.split('').reverse().join('');

    if (this.clean(text) === this.clean(reverse)) {
      return message.say(`*Nice palindrome. Very nice. Here it is reversed, I guess :shrug:*\n${reverse}`);
    }

    return message.say(reverse);
  }
};

module.exports = Reverse;
module.exports.meta = meta;
