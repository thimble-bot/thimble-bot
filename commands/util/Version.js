const { Command } = require('discord.js-commando');
const { version } = require('../../package');

class Version extends Command {
  constructor(client) {
    super(client, {
      name: 'version',
      group: 'util',
      memberName: 'version',
      description: 'ThimbleBot version.',
      examples: [ 'version' ]
    });
  }

  run(message) {
    const output = '`Thimble Bot v' + version + '`';
    return message.say(output);
  }
};

module.exports = Version;
