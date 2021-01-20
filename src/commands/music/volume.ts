import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error, info, success } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

interface VolumeCommandArgs {
  volume: number;
}

class VolumeCommand extends Command {
  constructor() {
    super('volume', {
      aliases: [ 'volume' ],
      args: [
        {
          id: 'volume',
          type: 'number',
          prompt: {
            start: 'Please provide the volume.',
            retry: 'Please enter a valid number.'
          }
        }
      ]
    });
  }

  async exec(message: Message, { volume }: VolumeCommandArgs) {
    if (!message.member?.voice.channel) {
      return message.channel.send(error('You have to be in a voice channel to use this command.'));
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message)) {
      return message.channel.send(info('There is nothing playing!'));
    }

    if (volume < 1 || volume > 100) {
      return message.channel.send(error('Please enter a valid volume (1-100).'));
    }

    client.distube.setVolume(message, volume);

    message.channel.send(success(`Set volume to ${volume}%!`));
  }
}

export default VolumeCommand;
