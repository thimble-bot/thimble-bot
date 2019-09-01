const { Command } = require('discord.js-commando');
const distanceInWords = require('date-fns/distance_in_words');

const meta = {
  name: 'uptime',
  description: 'Get the bot\'s uptime.'
};

class Uptime extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'uptime'
    });
  }

  run(message) {
    const uptime = process.uptime();

    return message.say(':stopwatch: `' + distanceInWords(0, uptime * 1000, { includeSeconds: true }) + '`');
  }
};

module.exports = Uptime;
module.exports.meta = meta;
