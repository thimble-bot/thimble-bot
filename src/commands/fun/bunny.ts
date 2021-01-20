import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';
import { error } from '../../lib/serviceMessages';

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
      .then(({ data }) => message.channel.send(data.media.gif))
      .catch(() => message.channel.send(error('Failed to fetch bunny. :frowning:')));
  }
}

export default BunnyCommand;
