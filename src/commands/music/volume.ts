import { Command } from '../../command';
import { Message } from 'discord.js';
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
      return this.error(message, 'You have to be in a voice channel to use this command.');
    }

    const client = this.client as IThimbleBot;

    if (!client.distube.isPlaying(message)) {
      return this.info(message, 'There is nothing playing!');
    }

    if (volume < 1 || volume > 100) {
      return this.error(message, 'Please enter a valid volume (1-100).');
    }

    client.distube.setVolume(message, volume);

    this.success(message, `Set volume to ${volume}%!`);
  }
}

export default VolumeCommand;
