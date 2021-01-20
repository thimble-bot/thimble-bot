import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import isDJ from '../../lib/isDJ';
import queueEmbed from '../../lib/music/queue';
import { error, info } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

class SkipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: [ 'skip' ]
    });
  }

  async exec(message: Message) {
    if (!message.member?.voice.channel) {
      return message.channel.send(error('You have to be in a voice channel to use this command.'));
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message)) {
      return message.channel.send(info('There is nothing playing!'));
    }

    if (!isDJ(message.member)) {
      return message.channel.send(error('You are not a DJ in the server. Please use `voteskip` instead.'));
    }

    const queue = client.distube.skip(message);
    const current = queue.songs[1];

    const title = `Skipped! Now playing: ${current.name}`;
    const embed = queueEmbed(title, queue.songs.slice(1), current.url);
    message.channel.send(embed);
  }
}

export default SkipCommand;
