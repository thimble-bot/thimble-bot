import { Command } from '../../command';
import { Message } from 'discord.js';

import figlet from 'figlet';

class ASCIICommand extends Command {
  constructor() {
    super('ascii', {
      aliases: [ 'ascii' ],
      description: {
        detail: 'Convert text to ASCII.',
        examples: [
          '`ascii hello` - will print "hello" using figlet\'s Big font'
        ]
      },
      args: [
        {
          id: 'text',
          match: 'content',
          prompt: {
            start: 'Please provide a text to ASCII-ify.'
          }
        }
      ]
    });
  }

  exec(message: Message, { text }: { text: string }) {
    const ascii = figlet.textSync(text, {
      font: 'Big',
      horizontalLayout: 'universal smushing',
      verticalLayout: 'universal smushing'
    });

    return message.channel.send(ascii, { code: true });
  }
}

export default ASCIICommand;
