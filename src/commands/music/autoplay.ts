import { Command } from '../../command';
import { Message } from 'discord.js';
import { IThimbleBot } from '../../typings/thimblebot';

class AutoplayCommand extends Command {
  constructor() {
    super('autoplay', {
      aliases: [ 'autoplay', 'ap' ]
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

    const state = client.distube.toggleAutoplay(message);

    return this.success(message, `Toggled autoplay ${state ? 'on' : 'off'}.`);
  }
}

export default AutoplayCommand;
