import { Command } from '../../command';
import { Message } from 'discord.js';
import Urban from '../../lib/Urban';

class UrbanCommand extends Command {
  constructor() {
    super('urban', {
      aliases: [ 'urban', 'define' ],
      description: {
        detail: 'Find the definition of something in Urban Dictionary.',
        examples: [
          '`urban owo` - will return the definition of "owo"'
        ]
      },
      args: [
        {
          id: 'word',
          match: 'content',
          prompt: {
            start: 'Please provide a word or phrase to search for.'
          }
        }
      ]
    });
  }

  async exec(message: Message, { word }: { word: string }) {
    try {
      const urban = new Urban({ word, user: this.client.user });
      const result = await urban.get();

      return this.say(message, result);
    } catch (err) {
      if ((err.code && err.code === 'ERR_WORD_UNDEFINED') || err.name === 'UrbanLookupError') {
        return this.error(message, err.message);
      }

      return this.error(message, 'An unexpected error happened.');
    }
  }
}

export default UrbanCommand;
