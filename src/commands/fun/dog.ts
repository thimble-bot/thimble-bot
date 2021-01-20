import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';
import { error } from '../../lib/serviceMessages';

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
      .then(({ data }) => message.channel.send(data.url))
      .catch(() => message.channel.send(error('Failed to fetch doggo. :frowning:')));
  }
}

export default DogCommand;
