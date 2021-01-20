import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import isDJ from '../../lib/isDJ';
import { error, info, success } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

class StopCommand extends Command {
  constructor() {
    super('stop', {
      aliases: [ 'stop', 'disconnect', 'leave' ]
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

    if (!isDJ(message.member)) {
      return message.channel.send(error('You are not a DJ in the server. Please use `votestop` instead.'));
    }

    client.distube.stop(message);
    message.channel.send(success('Stopped successfully!'));
  }
}

export default StopCommand;
