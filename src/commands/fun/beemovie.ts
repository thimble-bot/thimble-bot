import { Command } from '../../command';
import { Message, MessageEmbed } from 'discord.js';

import * as fs from 'fs';
import * as path from 'path';

const SCRIPT_PARAGRAPHS = fs.readFileSync(
  path.join(__dirname, '../../..', 'assets/beemovie.txt'),
  { encoding: 'utf8' }
).split('\n\n');

class BeeMovieCommand extends Command {
  constructor() {
    super('beemovie', {
      aliases: [ 'beemovie', 'b', 'bee' ],
      description: {
        detail: 'Get a random quote from the Bee Movie script.',
        examples: [
          '`beemovie` - will return a random quote from the movie',
          '`beemovie honey` - will return a random quote from the movie that contains the word "honey"'
        ]
      },
      args: [
        {
          id: 'phrase',
          match: 'content',
          default: ''
        }
      ]
    });
  }

  private generateEmbed(result: string, allCount: number, currentIdx: number, hasQuery: boolean = false): MessageEmbed {
    const embed = new MessageEmbed();
    embed.setTitle(':bee: Bee Movie');
    embed.setDescription(result);

    if (hasQuery) {
      embed.setFooter(`Result ${currentIdx + 1} of ${allCount}.`);
    }

    return embed;
  }

  exec(message: Message, { phrase }: { phrase: string }) {
    const paragraphs = phrase.length
      ? SCRIPT_PARAGRAPHS.filter(p => p.toLowerCase().includes(phrase.toLowerCase()))
      : SCRIPT_PARAGRAPHS.slice(0);

    const allCount = paragraphs.length;

    if (!allCount) {
      return this.warn(message, 'No results found for your query.');
    }

    const currentIdx = Math.floor(Math.random() * allCount);

    const result = paragraphs[currentIdx].replace(/\n/g, ' ');
    return this.say(message, this.generateEmbed(result, allCount, currentIdx, !!phrase.length));
  }
}

export default BeeMovieCommand;
