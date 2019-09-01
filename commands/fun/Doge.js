const { Command } = require('discord.js-commando');
const dogeify = require('dogeify-js');

const meta = {
  name: 'doge',
  description: 'Dogeifies a given string.',
  aliases: [ 'dogeify' ],
  args: [
    {
      key: 'text',
      type: 'string',
      prompt: 'What do you want to dogeify?'
    }
  ]
};

class DogeCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'doge'
    });
  }

  async run(message, { text }) {
    return message.say(await dogeify(text));
  }
};

module.exports = DogeCommand;
module.exports.meta = meta;
