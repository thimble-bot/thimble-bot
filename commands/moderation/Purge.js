const { Command } = require('discord.js-commando');
const config = require('../../config').bot;

class Purge extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      description: 'Purge messages.',
      examples: [ `${config.prefix}purge 2-100` ],
      aliases: [ 'clean', 'clear' ],
      userPermissions: [ 'MANAGE_MESSAGES' ],
      args: [
        {
          key: 'qty',
          prompt: 'How many messages?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { qty }) {
    if (qty < 2 || qty > 100) {
      return message.say(':warning: Quantity should be more than 2 and less than 100.');
    }

    await message.channel.bulkDelete(qty);
    const success = await message.say(`:recycle: Successfully deleted up to ${qty} messages.`);

    setTimeout(() => success.delete(), 2000);

    return null;
  }
};

module.exports = Purge;
