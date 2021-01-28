import { Command } from '../../command';
import { Message } from 'discord.js';

class PollCommand extends Command {
  constructor() {
    super('poll', {
      aliases: [ 'poll' ],
      description: 'Create reaction-based polls.',
      args: [
        {
          id: 'poll',
          match: 'content',
          prompt: {
            start: 'What is the question of this poll?'
          }
        }
      ],
      clientPermissions: [ 'ADD_REACTIONS' ],
      userPermissions: [ 'ADD_REACTIONS' ]
    });
  }

  async exec(message: Message) {
    try {
      await message.react('👍');
      await message.react('👎');
      await message.react('🤷');
    } catch (err) {
      this.error(message, 'Failed to add reaction.');
    }
  }
}

export default PollCommand;
