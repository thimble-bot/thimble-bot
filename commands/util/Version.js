const { Command } = require('discord.js-commando');
const { version } = require('../../package');
const config = require('../../config').bot;
const currentCommit = require('git-current-commit');

const meta = {
  name: 'version',
  description: 'Get ThimbleBot\'s version.'
};

class Version extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'version'
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
module.exports.meta = meta;
