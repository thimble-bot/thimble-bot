import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error, success } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

interface RepeatCommandArgs {
  mode: 'off' | 'song' | 'queue';
}

const modes = {
  off: {
    id: 0,
    label: 'No repeat'
  },
  song: {
    id: 1,
    label: 'Song'
  },
  queue: {
    id: 2,
    label: 'Queue'
  }
};

class RepeatCommand extends Command {
  constructor() {
    super('repeat', {
      aliases: [ 'repeat', 'loop' ],
      args: [
        {
          id: 'mode',
          type: [ 'off', 'song', 'queue' ],
          default: 'song'
        }
      ]
    });
  }

  async exec(message: Message, { mode }: RepeatCommandArgs) {
    if (!message.member?.voice.channel) {
      return message.channel.send(error('You have to be in a voice channel to use this command.'));
    }

    const repeat = modes[mode];
    const client = this.client as IThimbleBot;

    client.distube.setRepeatMode(message, repeat.id);

    message.channel.send(success(`Set repeat mode to \`${repeat.label}\`!`));
  }
}

export default RepeatCommand;
