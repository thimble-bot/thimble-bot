import { Message } from 'discord.js';
import { success } from '../../serviceMessages';

const onSearchCancel = (message: Message) => message.channel.send(success('Cancelled successfully!'));

export default onSearchCancel;
