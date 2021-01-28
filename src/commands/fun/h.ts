import { Command } from '../../command';
import { Message } from 'discord.js';

class HCommand extends Command {
  constructor() {
    super('h', {
      aliases: [ 'h' ],
      description: 'h'
    });
  }

  exec(message: Message) {
    return this.say(message, 'h');
  }
}

export default HCommand;
