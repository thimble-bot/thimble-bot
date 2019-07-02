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

  async run(message, { text }) {
    return message.say(text.split('').reverse().join(''));
  }
};

module.exports = Reverse;
module.exports.meta = meta;
