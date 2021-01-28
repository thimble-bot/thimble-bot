import { Command } from '../../command';
import { Message } from 'discord.js';
import axios from 'axios';

class BirdCommand extends Command {
  constructor() {
    super('bird', {
      aliases: [ 'bird', 'randombird', 'birb', 'randombirb' ],
      description: 'Get a random picture, GIF, or video of a bird.'
    });
  }

  exec(message: Message) {
    return axios.get('https://shibe.online/api/birds', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(({ data }) => this.say(message, data[0]))
      .catch(() => this.error(message, 'Failed to fetch birb. :frowning:'));
  }
}

export default BirdCommand;
