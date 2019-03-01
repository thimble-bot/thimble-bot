const { Command } = require('discord.js-commando');
const StatusTracker = require('../../lib/StatusTracker');
const config = require('../../config');

class ServerStatus extends Command {
  constructor(client) {
    super(client, {
      name: 'serverstatus',
      aliases: [ 'ss' ],
      group: 'utils',
      memberName: 'serverstatus',
      description: 'Checks whether all of my websites are up and running.',
      examples: [ `${config.bot.prefix}serverstatus` ]
    });
  }

  async run(message) {
    if (message.author.id !== config.bot.owner) {
      return;
    }

    if (!config.StatusTracker) {
      return message.say('The `.serverstatus` command is disabled because it is not configured properly.');
    }

    if (message.channel.name && message.channel.id !== config.StatusTracker.channel) {
      return;
    }

    const checkingMsg = await message.say('Okay, checking!');

    const tracker = new StatusTracker({ userInitialized: true });

    try {
      const result = await tracker.track();
      checkingMsg.delete();
      return message.say(result);
    } catch (err) {
      checkingMsg.delete();
      return message.say(':warning: Something bad happened.');
    }
  }
};

module.exports = ServerStatus;
