import { Command } from '../../command';
import { Message } from 'discord.js';
import axios from 'axios';

class CatCommand extends Command {
  constructor() {
    super('cat', {
      aliases: [ 'cat', 'randomcat', 'kitty' ],
      description: 'Get a random picture, GIF, or video of a cat.'
    });
  }

  exec(message: Message) {
    return axios.get('https://shibe.online/api/cats', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(({ data }) => this.say(message, data[0]))
      .catch(() => this.error(message, 'Failed to fetch kitty. :frowning:'));
  }
}

export default CatCommand;
