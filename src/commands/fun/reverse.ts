import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class ReverseCommand extends Command {
  constructor() {
    super('reverse', {
      aliases: [ 'reverse', 'strrev' ],
      description: {
        detail: 'Get the reverse of a given string.',
        examples: [ '`reverse Thimble` - will return "elbmihT"' ]
      },
      args: [
        {
          id: 'input',
          match: 'content',
          prompt: {
            start: 'What string do you want me to reverse?'
          }
        }
      ]
    });
  }

  private clean(str: string): string {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
  }

  exec(message: Message, { input }: { input: string }) {
    const reversed = input.split('').reverse().join('');

    if (this.clean(input) === this.clean(reversed)) {
      return message.channel.send(`*Nice palindrome. Very nice. Here it is reversed, I guess :shrug:*\n${reversed}`);
    }

    return message.channel.send(reversed);
  }
}

export default ReverseCommand;
