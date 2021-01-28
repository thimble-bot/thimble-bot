import { Command } from '../../command';
import { Message } from 'discord.js';
import axios from 'axios';

class BunnyCommand extends Command {
  constructor() {
    super('bunny', {
      aliases: [ 'bunny', 'randombunny', 'rabbit', 'randomrabbit', 'bun' ],
      description: 'Get a random GIF of a dog.'
    });
  }

  exec(message: Message) {
    return axios.get('https://api.bunnies.io/v2/loop/random/?media=gif', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(({ data }) => this.say(message, data.media.gif))
      .catch(() => this.error(message, 'Failed to fetch bunny. :frowning:'));
  }
}

export default BunnyCommand;
