import { Command } from '../../command';
import { Message } from 'discord.js';

interface ShipCommandArgs {
  input: string;
}

class ShipCommand extends Command {
  constructor() {
    super('ship', {
      aliases: [ 'ship' ],
      description: 'Get the love compatibility of two people. The values must be separated by " x " or " and ".',
      args: [
        {
          id: 'input',
          match: 'content'
        }
      ]
    });
  }

  private parseQuery(input: string): RegExpMatchArray | null {
    return input.match(/ and | x /);
  }

  private calculate(subjects: string[]): number {
    subjects = subjects.map(s => s.toLowerCase());

    let result = 0;

    subjects.forEach(subject => {
      for (let i = 0; i < subject.length; i++) {
        result += subject.charCodeAt(i);
      }
    });

    return result % 100;
  }

  exec(message: Message, { input }: ShipCommandArgs) {
    const query = this.parseQuery(input);

    if (!query) {
      // TODO: refactor this to use Akairo's regex type
      return this.warn(message, 'The arguments you have provided are invalid. The correct form is `person1 x person2` or `person1 and person2`.');
    }

    const separator = query[0];

    const subjects = input
      .split(separator)
      .map(subject => subject.trim());

    if (subjects.length < 2) {
      this.warn(message, 'Too few arguments provided.');
    }

    if (subjects.length > 2) {
      this.warn(message, 'Too many arguments provided.');
    }

    const compatibility = this.calculate(subjects);
    const emojis = [ ':heart:', ':heart_decoration:', ':heartpulse:', ':heart_exclamation:' ];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    return this.say(message, `${randomEmoji} The ship compatibility of ${subjects.join(separator)} is **${compatibility}%**.`);
  }
}

export default ShipCommand;
