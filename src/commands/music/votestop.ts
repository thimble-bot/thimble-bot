import { Command } from '../../command';
import { Message, MessageReaction } from 'discord.js';
import { IThimbleBot } from '../../typings/thimblebot';

class VotestopCommand extends Command {
  constructor() {
    super('votestop', {
      aliases: [ 'votestop' ]
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

    const targetCount = message.member.voice.channel.members.size < 5
      ? message.member.voice.channel.members.size
      : 5;

    const time = targetCount * 5;

    const reply = await this.info(
      message,
      `If this message reaches ${targetCount} :white_check_mark: reactions in ${time} seconds, I will stop this queue.`
    );
    await reply.react('✅');

    const collector = reply.createReactionCollector((reaction: MessageReaction) => {
      return reaction.emoji.name === '✅';
    }, { time: time * 1000 });

    let enoughVotes = false;

    collector.on('collect', async reaction => {
      if (reaction.count === targetCount) {
        collector.stop();
        enoughVotes = true;

        client.distube.stop(message);

        await this.success(message, 'Stopped successfully!');
      }
    });

    collector.on('end', async () => {
      await reply.delete();

      if (enoughVotes) {
        return;
      }

      return this.error(message, 'Not enough reactions, not stopping.');
    });
  }
}

export default VotestopCommand;
