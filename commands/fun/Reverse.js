const { Command } = require('discord.js-commando');

class Reverse extends Command {
  constructor(client) {
    super(client, {
      name: 'reverse',
      group: 'fun',
      memberName: 'reverse',
      description: 'Get the reverse of a given string.',
      examples: [ '`reverse Thimble` - will return "elbmihT"' ],
      args: [
        {
          key: 'text',
          prompt: 'What text do you want me to reverse?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { text }) {
    return message.say(text.split('').reverse().join(''));
  }
};

module.exports = Reverse;
