import { Command } from 'discord-akairo';
import { Message, MessageReaction } from 'discord.js';
import queueEmbed from '../../lib/music/queue';
import { error, info } from '../../lib/serviceMessages';
import { IThimbleBot } from '../../typings/thimblebot';

class VoteskipCommand extends Command {
  constructor() {
    super('voteskip', {
      aliases: [ 'voteskip' ]
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

    const targetCount = message.member.voice.channel.members.size < 5
      ? message.member.voice.channel.members.size
      : 5;

    const time = targetCount * 5;

    const reply = await message.channel.send(
      info(`If this message reaches ${targetCount} :white_check_mark: reactions in ${time} seconds, I will skip the song.`)
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
        await message.channel.send(embed);
      }
    });

    collector.on('end', async () => {
      await reply.delete();

      if (enoughVotes) {
        return;
      }

      return message.channel.send(error('Not enough reactions, not skipping.'));
    });
  }
}

export default VoteskipCommand;
