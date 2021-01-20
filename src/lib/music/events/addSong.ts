import { Message, MessageEmbed, EmbedField } from 'discord.js';
import Queue from 'distube/typings/Queue';
import Song from 'distube/typings/Song';
import queueInfo from '../queueInfo';

const onAddSong = (message: Message, queue: Queue, song: Song) => {
  const embed = new MessageEmbed();
  embed.setTitle(':white_check_mark: Added Song');
  embed.setURL(song.url);
  embed.setDescription(`[${song.name}](${song.url})`);
  embed.setColor(0xFF8DBF);
  embed.setThumbnail(song.thumbnail);

  const fields: EmbedField[] = [];

  fields.push({
    name: 'Added By',
    value: song.user.toString(),
    inline: true
  });

  fields.push({
    name: 'Duration',
    value: song.formattedDuration,
    inline: true
  });

  fields.push(...queueInfo(queue));

  embed.addFields(fields);

  message.channel.send(embed);
};

export default onAddSong;
