import { Command } from '../../command';
import { Message } from 'discord.js';

class HyphenCommand extends Command {
  constructor() {
    super('hyphen', {
      aliases: [ 'hyphen', 'xkcd37' ],
      description: {
        detail: 'Place the hyphen one word to the right in every [adjective]-ass [noun] sequence. https://xkcd.com/37',
        examples: [
          '`hyphen That is a big-ass cake` - will be turned into "That is a big ass-cake"'
        ]
      },
      args: [
        {
          id: 'sentence',
          match: 'content',
          prompt: {
            start: 'Please provide a sentence.'
          }
        }
      ]
    });
  }

  exec(message: Message, { sentence }: { sentence: string }) {
    const components = sentence.split('-ass');

    if (!sentence.includes('-ass') || components.length !== 2 || !components.join('')) {
      return this.error(message, 'Please provide a valid `[adjective]-ass [noun]` sequence.');
    }

    components[1] = components[1].replace(' ', '-');
    return this.say(message, components.join(' ass'));
  }
}

export default HyphenCommand;
