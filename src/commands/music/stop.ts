import { Command } from '../../command';
import { Message } from 'discord.js';
import isDJ from '../../lib/isDJ';
import { IThimbleBot } from '../../typings/thimblebot';

class StopCommand extends Command {
  constructor() {
    super('stop', {
      aliases: [ 'stop', 'disconnect', 'leave' ]
    });
  }

  async exec(message: Message) {
    if (!message.member?.voice.channel) {
      return this.error(message, 'You have to be in a voice channel to use this command.');
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message) && !client.distube.isPaused(message)) {
      return this.info(message, 'There is nothing playing!');
    }

    if (!isDJ(message.member)) {
      return this.error(message, 'You are not a DJ in the server. Please use `votestop` instead.');
    }

    client.distube.stop(message);
    this.success(message, 'Stopped successfully!');
  }
}

export default StopCommand;
