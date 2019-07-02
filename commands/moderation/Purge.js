const { Command } = require('discord.js-commando');

const meta = {
  name: 'purge',
  description: 'Purge the last `n` (2-100) messages.',
  examples: [
    '`purge 20` - Will purge up to the last 20 messages'
  ],
  aliases: [ 'clean', 'clear' ],
  args: [
    {
      key: 'qty',
      prompt: 'How many messages?',
      type: 'string'
    }
  ]
};

class Purge extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'moderation',
      memberName: 'purge',
      guildOnly: true,
      userPermissions: [ 'MANAGE_MESSAGES' ]
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
module.exports.meta = meta;
