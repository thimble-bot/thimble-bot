import { Command } from '../../command';
import { Message, TextChannel } from 'discord.js';

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
      return this.warn(message, 'Quantity should be more than 2 and less than 100.');
    }

    const channel = message.channel as TextChannel;

    try {
      await channel.bulkDelete(qty);
      const successMessage = await this.success(message, `:recycle: Successfully deleted up to ${qty} messages.`);
      setTimeout(() => successMessage.delete(), 2000);
    } catch (err) {
      this.error(message, 'Failed to purge messages.');
    }
  }
}

export default PurgeCommand;
