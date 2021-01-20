import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';
import { error, success, warn } from '../../lib/serviceMessages';

interface PurgeCommandArgs {
  qty: number;
}

class PurgeCommand extends Command {
  constructor() {
    super('purge', {
      aliases: [ 'purge', 'clear', 'clean' ],
      description: 'Purge the last `n` (2-100) messages.',
      channel: 'guild',
      clientPermissions: [ 'MANAGE_MESSAGES' ],
      userPermissions: [ 'MANAGE_MESSAGES' ],
      args: [
        {
          id: 'qty',
          type: 'number',
          prompt: {
            start: 'How many messages?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { qty }: PurgeCommandArgs) {
    if (qty < 2 || qty > 100) {
      return message.channel.send(warn('Quantity should be more than 2 and less than 100.'));
    }

    const channel = message.channel as TextChannel;

    try {
      await channel.bulkDelete(qty);
      const successMessage = await message.channel.send(success(`:recycle: Successfully deleted up to ${qty} messages.`));
      setTimeout(() => successMessage.delete(), 2000);
    } catch (err) {
      console.error(err);
      message.channel.send(error('Failed to purge messages.'));
    }
  }
}

export default PurgeCommand;
