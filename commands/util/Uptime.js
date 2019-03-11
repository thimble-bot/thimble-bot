const { Command } = require('discord.js-commando');
const prettyMs = require('pretty-ms');

class Uptime extends Command {
  constructor(client) {
    super(client, {
      name: 'uptime',
      group: 'util',
      memberName: 'uptime',
      description: 'Get bot uptime.',
      examples: [ 'uptime' ]
    });
  }

  run(message) {
    const uptime = process.uptime();

    message.say(':stopwatch: `' + prettyMs(uptime) + '`');
  }
};

module.exports = Uptime;
