import { Command } from '../../command';
import { Message } from 'discord.js';
import { IThimbleBot } from '../../typings/thimblebot';

class ResumeCommand extends Command {
  constructor() {
    super('resume', {
      aliases: [ 'resume' ]
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

    if (!client.distube.isPaused(message)) {
      return this.info(message, 'The song is already playing!');
    }

    client.distube.resume(message);
    this.success(message, 'Paused successfully!');
  }
}

export default ResumeCommand;
