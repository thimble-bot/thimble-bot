const { Command } = require('discord.js-commando');
const update = require('../../bin/update');

class Update extends Command {
  constructor(client) {
    super(client, {
      name: 'update',
      group: 'maintenance',
      memberName: 'update',
      description: 'Update the bot via git.',
      ownerOnly: true,
      guarded: true
    });
  }

  run(message) {
    message.say('Updating Thimble Bot...');

    return update(message.guild.id, message.channel.id);
  }
};

module.exports = Update;
