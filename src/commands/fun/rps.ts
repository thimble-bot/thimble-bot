import { Command } from '../../command';
import { Message, MessageEmbed } from 'discord.js';
import { error, warn } from '../../lib/serviceMessages';

type RPSItem = 'rock' | 'paper' | 'scissors';

interface RPSPair {
  [key: string]: RPSItem;
};

interface EmojiPair {
  [key: string]: string;
}

const RPS_PAIRS: RPSPair = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

const EMOJI_PAIRS: EmojiPair = {
  rock: ':rock:',
  paper: ':newspaper:',
  scissors: ':scissors:'
};

export default class RPSCommand extends Command {
  constructor() {
    super('rps', {
      aliases: [ 'rps', 'rockpaperscissors' ],
      description: {
        detail: 'Play rock-paper-scissors with the bot.',
        examples: [
          '`rps rock` - will play with rock'
        ]
      },
      args: [
        {
          id: 'choice',
          type: Object.keys(RPS_PAIRS),
          prompt: {
            start: warn('Please provide your choice (rock, paper, scissors).'),
            retry: error('Unknown item.')
          }
        }
      ]
    });
  }

  private getItem(item: string) {
    return `${EMOJI_PAIRS[item]} ${item}`;
  }

  exec(message: Message, { choice }: { choice: string }) {
    const items = Object.keys(RPS_PAIRS);
    const botChoice = items[Math.floor(Math.random() * items.length)];

    const embed = new MessageEmbed();

    embed.setTitle(`${EMOJI_PAIRS[botChoice]} I went with ${botChoice}!`);
    embed.setDescription(`Wow, we both picked ${this.getItem(choice)}. It's a tie!`);
    embed.setColor(0x1E88E5);

    if (RPS_PAIRS[botChoice] === choice) {
      embed.setDescription(`${this.getItem(botChoice)} beats ${this.getItem(choice)} - therefore, I win :v:`);
      embed.setColor(0xE53935);
    }

    if (RPS_PAIRS[choice] === botChoice) {
      embed.setDescription(`${this.getItem(choice)} beats ${this.getItem(botChoice)}... I lost :pensive:`);
      embed.setColor(0x43A047);
    }

    return this.say(message, embed);
  }
};
