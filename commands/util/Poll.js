const { Command } = require('discord.js-commando');

const meta = {
  name: 'poll',
  description: 'Create reaction-based polls.',
  args: [
    {
      key: 'poll',
      type: 'string',
      prompt: '',
      default: ''
    }
  ],
  examples: [
    '`poll Should I sleep?` - will react with 👍, 👎, and 🤷 to your message.'
  ]
};

class PollCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'poll',
      group: 'util',
      userPermissions: [ 'ADD_REACTIONS' ],
      clientPermissions: [ 'ADD_REACTIONS' ]
    });
  }

  async run(message, { poll }) {
    if (!poll) {
      return message.say(':warning: Maybe try providing the question of this poll, too...');
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
module.exports.meta = meta;
