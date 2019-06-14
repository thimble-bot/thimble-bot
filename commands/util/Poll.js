const { Command } = require('discord.js-commando');

class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      memberName: 'poll',
      description: 'Create reaction-based polls.',
      group: 'util',
      userPermissions: [ 'ADD_REACTIONS' ],
      clientPermissions: [ 'ADD_REACTIONS' ]
    });
  }

  async run(message) {
    try {
      await message.react('👍');
      await message.react('👎');
      await message.react('🤷');
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to add reactions.');
    }
  }
};

module.exports = PollCommand;
