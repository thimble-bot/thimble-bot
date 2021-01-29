import { Command } from '../../command';
import { Message } from 'discord.js';

import Minesweeper from 'discord.js-minesweeper';

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
        detail: [
          'Play Minesweeper using Discord spoiler tags.',
          '**Flags:**',
          '  • `--rows n`: set row count to `n` (default: 9)',
          '  • `--columns n`: set column count to `n` (default: 9)',
          '  • `--mines n`: set mine count to `n` (default: 10)',
          '  • `--plaintext`: return the result as a code block instead'
        ].join('\n'),
        examples: [
          '`minesweeper --rows 8 --columns 8 --mines 20` - Generate an 8x8 Minesweeper field with 20 mines',
          '`minesweeper --plaintext` - Generate the code for a 9x9 Minesweeper field with 10 mines'
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
      return this.warn(message, 'You have provided too many mines for this field.');
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
      return this.say(message, output);
    } catch (err) {
      return this.error(message, 'Something bad happened.');
    }
  }
}

export default MinesweeperCommand;
