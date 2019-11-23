const { Command } = require('discord.js-commando');

const meta = {
  name: 'h',
  description: 'h'
};

class HCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'h',
      group: 'fun'
    });
  }

  run(message) {
    return message.say('h');
  }
};

module.exports = HCommand;
module.exports.meta = meta;
