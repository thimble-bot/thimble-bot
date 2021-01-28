import { Command } from '../../command';
import { Message } from 'discord.js';

import Chance from 'chance';
import { format } from 'date-fns';

class WhenCommand extends Command {
  constructor() {
    super('when', {
      aliases: [ 'when' ],
      description: 'When will a certain event happen? (pRNG)',
      args: [
        {
          id: 'input',
          match: 'content',
          prompt: {
            start: 'What are you interested in?'
          }
        }
      ]
    });
  }

  exec(message: Message, { input }: { input: string }) {
    const rng = new Chance(input); // seed
    const now = new Date();

    const random = rng.date({
      min: now,
      max: new Date('2100')
    });

    const output = `That will happen on **${format(random as Date, 'EEEE, MMMM d, yyyy h:mm a')}**.`;
    return message.reply(output);
  }
}

export default WhenCommand;
