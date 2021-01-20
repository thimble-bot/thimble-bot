import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error } from '../../lib/serviceMessages';

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
      console.error(err);
      message.channel.send(error('Failed to add reaction.'));
    }
  }
}

export default PollCommand;
