import { Command } from '../../command';
import { Message, MessageEmbed } from 'discord.js';

class FlipCommand extends Command {
  constructor() {
    super('flip', {
      aliases: [ 'flip', 'choice' ],
      description: {
        detail: 'Flip a coin or choose from items.',
        examples: [

        ]
      },
      args: [
        {
          id: 'input',
          match: 'content',
          default: ''
        }
      ]
    });
  }

  exec(message: Message, { input }: { input: string }) {
    const choices = input.length
      ? input.split(/\s*\|\s*/g)
      : [ 'head', 'tails' ];

    const isCoinflip = !!input.length;

    if (choices.length < 2) {
      return this.warn(message, 'Too few items to choose from!');
    }

    const choice = choices[Math.floor(Math.random() * choices.length)];

    const embed = new MessageEmbed();
    embed.setTitle(isCoinflip ? ':game_die: Random Choice' : ':coin: Coin Flip');
    embed.setDescription(choice);

    return this.say(message, embed);
  }
}

export default FlipCommand;
