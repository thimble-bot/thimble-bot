import { Command } from '../../command';
import { Message } from 'discord.js';

class StalinSortCommand extends Command {
  constructor() {
    super('stalinsort', {
      aliases: [ 'stalinsort' ],
      description: {
        detail: 'Sort numbers using the O(n) Stalin Sort algorithm. Numbers must be separated by space.',
        examples: [
          '`stalinsort 7 6 2 1 9 2 4`'
        ]
      },
      args: [
        {
          id: 'input',
          match: 'content',
          prompt: {
            start: 'What numbers would you like to sort?'
          }
        }
      ]
    });
  }

  private areAllNumbers(arr: string[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(arr[i] as any)) {
        return false;
      }

      const num = parseInt(arr[i], 10);

      if (num >= Number.MAX_SAFE_INTEGER || num <= Number.MIN_SAFE_INTEGER) {
        return false;
      }
    }

    return true;
  }

  private stalinSort(arr: number[]): number[] {
    let max = Number.MIN_SAFE_INTEGER;
    const result: number[] = [];

    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= max) {
        max = arr[i];
        result.push(arr[i]);
      }
    }

    return result;
  }

  exec(message: Message, { input }: { input: string }) {
    const rawNumbers = input.match(/\b(\w+)\b/g);

    if (!rawNumbers || !this.areAllNumbers(rawNumbers)) {
      return this.warn(message, 'Please provide valid numbers.');
    }

    const numbers = rawNumbers.map(n => parseInt(n, 10));
    const result = this.stalinSort(numbers);

    return this.say(message, `\`${result.join(' ')}\``);
  }
}

export default StalinSortCommand;
