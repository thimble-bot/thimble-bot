import { Command } from '../../command';
import { Message } from 'discord.js';

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: [ 'ping' ]
    });
  }

  exec(message: Message) {
    return message.reply('Pong!');
  }
}

export default PingCommand;
