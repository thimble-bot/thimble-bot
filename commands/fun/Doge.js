const { Command } = require('discord.js-commando');
const dogeify = require('dogeify-js');

class DogeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'doge',
      group: 'fun',
      memberName: 'doge',
      description: 'Dogeifies a given string.',
      aliases: [ 'dogeify' ],
      args: [
        {
          key: 'text',
          type: 'string',
          prompt: 'What do you want to dogeify?'
        }
      ]
    });
  }

  run(message, { text }) {
    return message.say(dogeify(text));
  }
};

module.exports = DogeCommand;
