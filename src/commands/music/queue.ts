import { Command } from '../../command';
import { Message } from 'discord.js';
import queueEmbed from '../../lib/music/queue';
import { IThimbleBot } from '../../typings/thimblebot';

class QueueCommand extends Command {
  constructor() {
    super('queue', {
      aliases: [ 'queue' ]
    });
  }

  async exec(message: Message) {
    const queue = (this.client as IThimbleBot).distube.getQueue(message);

    if (!queue) {
      return this.info(message, 'The queue is empty!');
    }

    const embed = queueEmbed('Current Queue', queue.songs);
    this.say(message, embed);
  }
}

export default QueueCommand;
