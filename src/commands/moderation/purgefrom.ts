import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';
import { error, success } from '../../lib/serviceMessages';

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
      return message.channel.send(error('Cannot delete less than 2 messages.'));
    }

    if (messages.size > 100) {
      return message.channel.send(error('Cannot delete more than 100 messages.'));
    }

    try {
      (message.channel as TextChannel).bulkDelete(messages);
      const successMessage = await message.channel.send(success(`:recycle: Successfully deleted ${messages.size} messages!`));

      setTimeout(() => successMessage.delete(), 2000);

      return null;
    } catch (err) {
      console.error(err);
      return message.channel.send(error('Failed to delete messages.'));
    }
  }
}

export default PurgeFromCommand;
