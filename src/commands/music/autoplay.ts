import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error, info, success } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

class AutoplayCommand extends Command {
  constructor() {
    super('autoplay', {
      aliases: [ 'autoplay', 'ap' ]
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

    const state = client.distube.toggleAutoplay(message);

    return message.channel.send(success(`Toggled autoplay ${state ? 'on' : 'off'}.`));
  }
}

export default AutoplayCommand;
