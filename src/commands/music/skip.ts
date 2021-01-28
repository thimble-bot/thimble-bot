import { Command } from '../../command';
import { Message } from 'discord.js';
import isDJ from '../../lib/isDJ';
import queueEmbed from '../../lib/music/queue';
import { IThimbleBot } from '../../typings/thimblebot';

class SkipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: [ 'skip' ]
    });
  }

  async exec(message: Message) {
    if (!message.member?.voice.channel) {
      return this.error(message, 'You have to be in a voice channel to use this command.');
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message)) {
      return this.info(message, 'There is nothing playing!');
    }

    if (!isDJ(message.member)) {
      return this.error(message, 'You are not a DJ in the server. Please use `voteskip` instead.');
    }

    const queue = client.distube.skip(message);
    const current = queue.songs[1];

    const title = `Skipped! Now playing: ${current.name}`;
    const embed = queueEmbed(title, queue.songs.slice(1), current.url);
    this.say(message, embed);
  }
}

export default SkipCommand;
