const { Command } = require('discord.js-commando');

class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      memberName: 'poll',
      description: 'Create reaction-based polls.',
      group: 'util',
      userPermissions: [ 'ADD_REACTIONS' ],
      clientPermissions: [ 'ADD_REACTIONS' ],
      args: [
        {
          key: 'poll',
          type: 'string',
          prompt: '',
          default: ''
        }
      ]
    });
  }

  async run(message, { poll }) {
    if (!poll) {
      return message.say(':warning: Maybe try providing the question of this poll, too...')
    }

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
