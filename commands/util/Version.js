const { Command } = require('discord.js-commando');
const { version } = require('../../package');
const config = require('../../config').bot;
const currentCommit = require('git-current-commit');

class Version extends Command {
  constructor(client) {
    super(client, {
      name: 'version',
      group: 'util',
      memberName: 'version',
      description: 'Get ThimbleBot\'s version.'
    });
  }

  run(message) {
    const thimbleVersion = config.isMasterBranch
      ? currentCommit.sync()
      : `v${version}`;
    const output = '`Thimble Bot ' + thimbleVersion + '`';
    return message.say(output);
  }
};

module.exports = Version;
