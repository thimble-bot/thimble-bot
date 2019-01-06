const { Command } = require('discord.js-commando');
const config = require('../../config');

class Reverse extends Command {
  constructor(client) {
    super(client, {
      name: 'reverse',
      group: 'fun',
      memberName: 'reverse',
      description: 'Reverse text.',
      examples: [ `${config.bot.prefix}reverse [something]` ],
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
