import { MessageEmbed } from 'discord.js';
import Song from 'distube/typings/Song';

const queueEmbed = (title: string, songs: Song[], url: string | null = null): MessageEmbed => {
  const description = songs.map((song, idx) => {
    const order = idx === 0 ? '(Now Playing)' : `${idx}.`;
    return `${order} [${song.name}](${song.url}) (\`${song.formattedDuration}\`)`;
  }).join('\n');

  const embed = new MessageEmbed();
  embed.setTitle(title);
  embed.setDescription(description);
  embed.setColor(0xFF8DBF);

  if (url) {
    embed.setURL(url);
  }

  return embed;
};

export default queueEmbed;
