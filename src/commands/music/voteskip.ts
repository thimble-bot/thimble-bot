import { Command } from '../../command';
import { Message, MessageReaction } from 'discord.js';
import queueEmbed from '../../lib/music/queue';
import { IThimbleBot } from '../../typings/thimblebot';

class VoteskipCommand extends Command {
  constructor() {
    super('voteskip', {
      aliases: [ 'voteskip' ]
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

    const targetCount = message.member.voice.channel.members.size < 5
      ? message.member.voice.channel.members.size
      : 5;

    const time = targetCount * 5;

    const reply = await this.info(
      message,
      `If this message reaches ${targetCount} :white_check_mark: reactions in ${time} seconds, I will skip the song.`
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

        const queue = client.distube.skip(message);
        const current = queue.songs[1];

        const title = `Skipped! Now playing: ${current.name}`;
        const embed = queueEmbed(title, queue.songs.slice(1), current.url);
        await this.say(message, embed);
      }
    });

    collector.on('end', async () => {
      await reply.delete();

      if (enoughVotes) {
        return;
      }

      return this.error(message, 'Not enough reactions, not skipping.');
    });
  }
}

export default VoteskipCommand;
