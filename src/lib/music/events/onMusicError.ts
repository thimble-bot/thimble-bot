import { Message } from 'discord.js';
import { error } from '../../serviceMessages';

const onMusicError = (message: Message, err: Error) => {
  const contents = error(`Error: ${err}`);
  message.channel.send(contents);
};

export default onMusicError;
