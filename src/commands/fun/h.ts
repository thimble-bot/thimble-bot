import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class HCommand extends Command {
  constructor() {
    super('h', {
      aliases: [ 'h' ],
      description: 'h'
    });
  }

  exec(message: Message) {
    return message.channel.send('h');
  }
}

export default HCommand;
