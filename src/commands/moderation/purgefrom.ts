import { Command } from '../../command';
import { Message, TextChannel } from 'discord.js';

interface PurgeFromCommandArgs {
  targetMessage: Message;
}

class PurgeFromCommand extends Command {
  constructor() {
    super('purgefrom', {
      aliases: [ 'purgefrom', 'clearfrom', 'pf' ],
      description: 'Purge messages starting from a given message ID.',
      channel: 'guild',
      clientPermissions: [ 'MANAGE_MESSAGES' ],
      userPermissions: [ 'MANAGE_MESSAGES' ],
      args: [
        {
          id: 'targetMessage',
          type: 'message',
          prompt: {
            start: 'From which message do you want to start the removal?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { targetMessage }: PurgeFromCommandArgs) {
    const messages = await message.channel.messages.fetch()
      .then(results => results.filter(r => r.createdTimestamp >= targetMessage.createdTimestamp));

    if (messages.size < 2) {
      return this.error(message, 'Cannot delete less than 2 messages.');
    }

    if (messages.size > 100) {
      return this.error(message, 'Cannot delete more than 100 messages.');
    }

    try {
      (message.channel as TextChannel).bulkDelete(messages);
      const successMessage = await this.success(message, `:recycle: Successfully deleted ${messages.size} messages!`);

      setTimeout(() => successMessage.delete(), 2000);

      return null;
    } catch (err) {
      return this.error(message, 'Failed to delete messages.');
    }
  }
}

export default PurgeFromCommand;
