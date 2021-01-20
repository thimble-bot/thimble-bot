import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';
import { error } from '../../lib/serviceMessages';

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
      .then(({ data }) => message.channel.send(data[0]))
      .catch(() => message.channel.send(error('Failed to fetch birb. :frowning:')));
  }
}

export default BirdCommand;
