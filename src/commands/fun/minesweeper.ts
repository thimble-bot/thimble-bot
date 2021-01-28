import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

import Minesweeper from 'discord.js-minesweeper';
import { error, warn } from '../../lib/serviceMessages';

interface MinesweeperCommandArgs {
  rows: number;
  columns: number;
  mines: number;
  plaintext: boolean;
}

class MinesweeperCommand extends Command {
  constructor() {
    super('minesweeper', {
      aliases: [ 'minesweeper' ],
      description: {
        detail: 'Play Minesweeper using Discord spoiler tags.',
        examples: [
          '`minesweeper 8 8 20` - Generate an 8x8 Minesweeper field with 20 mines',
          '`minesweeper 8 8 20 1` - Generate the code for an 8x8 Minesweeper field with 20 mines'
        ]
      },
      args: [
        {
          id: 'rows',
          flag: 'rows',
          type: 'number',
          default: 9
        },
        {
          id: 'columns',
          flag: 'columns',
          type: 'number',
          default: 9
        },
        {
          id: 'mines',
          flag: 'mines',
          type: 'number',
          default: 10
        },
        {
          id: 'plaintext',
          type: (message: Message): boolean | null => {
            // hacky, but works

            if (message.content.includes('--plain') || message.content.includes('--plaintext')) {
              return true;
            }

            return null;
          },
          default: false
        }
      ]
    });
  }

  exec(message: Message, { rows, columns, mines, plaintext }: MinesweeperCommandArgs) {
    if (rows * columns <= mines * 2) {
      return message.channel.send(warn('You have provided too many mines for this field.'));
    }

    const returnType = plaintext ? 'code' : 'emoji';

    const minesweeper = new Minesweeper({
      rows,
      columns,
      mines,
      returnType,
      revealFirstCell: true
    });

    try {
      const output = `Rows: \`${rows}\`, columns: \`${columns}\` (cells: \`${rows * columns}\`), mines: \`${mines}\`\n\n${minesweeper.start()}`;
      return message.channel.send(output);
    } catch (err) {
      return message.channel.send(error('Something bad happened.'));
    }
  }
}

export default MinesweeperCommand;
