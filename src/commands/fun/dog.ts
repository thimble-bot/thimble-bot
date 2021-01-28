import { Command } from '../../command';
import { Message } from 'discord.js';
import axios from 'axios';

class DogCommand extends Command {
  constructor() {
    super('dog', {
      aliases: [ 'dog', 'randomdog', 'doggo' ],
      description: 'Get a random picture, GIF, or video of a dog.'
    });
  }

  exec(message: Message) {
    return axios.get('https://random.dog/woof.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(({ data }) => this.say(message, data.url))
      .catch(() => this.error(message, 'Failed to fetch doggo. :frowning:'));
  }
}

export default DogCommand;
