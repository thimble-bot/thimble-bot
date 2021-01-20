import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';
import { error } from '../../lib/serviceMessages';

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
      .then(({ data }) => message.channel.send(data[0]))
      .catch(() => message.channel.send(error('Failed to fetch kitty. :frowning:')));
  }
}

export default CatCommand;
