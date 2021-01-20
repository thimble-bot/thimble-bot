import { EmbedField } from 'discord.js';
import Queue from 'distube/typings/Queue';

const queueInfo = (queue: Queue): EmbedField[] => {
  const data: EmbedField[] = [];

  data.push({
    name: 'Volume',
    value: `${queue.volume}%`,
    inline: true
  });

  data.push({
    name: 'Filter',
    value: queue.filter || 'Off',
    inline: true
  });

  const loop = queue.repeatMode
    ? queue.repeatMode === 2 ? 'All' : 'Current Song'
    : 'Off';

  data.push({
    name: 'Loop',
    value: loop,
    inline: true
  });

  data.push({
    name: 'Autoplay',
    value: queue.autoplay ? 'On' : 'Off',
    inline: true
  });

  return data;
};

export default queueInfo;
