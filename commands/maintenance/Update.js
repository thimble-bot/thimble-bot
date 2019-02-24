const { Command } = require('discord.js-commando');
const config = require('../../config');
const update = require('../../bin/update');

class Update extends Command {
  constructor(client) {
    super(client, {
      name: 'update',
      group: 'maintenance',
      memberName: 'update',
      description: 'Update the bot via git.'
    });
  }

  run(message) {
    if (message.author.id !== config.bot.owner) {
      return;
    }

    message.say('Updating Thimble Bot...');

    return update(message.guild.id, message.channel.id);
  }
};

module.exports = Update;
