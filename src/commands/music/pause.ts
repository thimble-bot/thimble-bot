import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error, info, success } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

class PauseCommand extends Command {
  constructor() {
    super('pause', {
      aliases: [ 'pause' ]
    });
  }

  async exec(message: Message) {
    if (!message.member?.voice.channel) {
      return message.channel.send(error('You have to be in a voice channel to use this command.'));
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message) && !client.distube.isPaused(message)) {
      return message.channel.send(info('There is nothing playing!'));
    }

    if (client.distube.isPaused(message)) {
      return message.channel.send(info('The playback is already paused!'));
    }

    client.distube.pause(message);
    message.channel.send(success('Paused successfully!'));
  }
}

export default PauseCommand;
