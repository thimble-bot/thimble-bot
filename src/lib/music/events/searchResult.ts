import { Message, MessageEmbed } from 'discord.js';
import SearchResult from 'distube/typings/SearchResult';

const onSearchResult = (message: Message, songs: SearchResult[]) => {
  const results = songs.map((song, idx) => {
    return `${idx + 1}. [${song.name}](${song.url}) (\`${song.formattedDuration}\`)`;
  }).join('\n');

  const embed = new MessageEmbed();
  embed.setTitle('Choose an option from below');
  embed.setDescription(results);
  embed.setColor(0xFF8DBF);
  embed.setFooter('Enter anything else or wait 60 seconds to cancel.');

  message.channel.send(embed);
};

export default onSearchResult;
