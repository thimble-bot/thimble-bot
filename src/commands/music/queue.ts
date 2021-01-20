import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { info } from '../../lib/serviceMessages';
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
      return message.channel.send(info('The queue is empty!'));
    }

    const embed = queueEmbed('Current Queue', queue.songs);
    message.channel.send(embed);
  }
}

export default QueueCommand;
