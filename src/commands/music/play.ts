import { Command } from '../../command';
import { Message } from 'discord.js';
import { IThimbleBot } from '../../typings/thimblebot';

interface PlayCommandArgs {
  query: string;
}

class PlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: [ 'play' ],
      args: [
        {
          id: 'query',
          match: 'content',
          prompt: {
            start: 'What should I play?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { query }: PlayCommandArgs) {
    if (!message.member?.voice.channel) {
      return this.error(message, 'You have to be in a voice channel to use this command.');
    }

    (this.client as IThimbleBot).distube.play(message, query);
  }
}

export default PlayCommand;
