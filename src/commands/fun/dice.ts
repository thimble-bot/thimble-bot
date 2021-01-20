import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

class DiceCommand extends Command {
  constructor() {
    super('dice', {
      aliases: [ 'dice', 'die', 'd' ],
      description: {
        detail: 'Roll a dice.',
        examples: [
          '`dice` - roll a dice with 6 sides',
          '`dice 10` - roll a dice with 10 sides'
        ]
      },
      args: [
        {
          id: 'sides',
          type: 'number',
          default: 6
        }
      ]
    });
  }

  exec(message: Message, { sides }: { sides: number }) {
    const result = Math.floor(Math.random() * Math.abs(sides)) + 1;

    const embed = new MessageEmbed();
    embed.setTitle(':game_die: Dice Roll');
    embed.setDescription(`I rolled a die and it landed on **${result}**.`);
    return message.channel.send(embed);
  }
}

export default DiceCommand;
