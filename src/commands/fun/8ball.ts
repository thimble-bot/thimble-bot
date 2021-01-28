import { Command } from '../../command';
import { Message, MessageEmbed } from 'discord.js';
import seed from 'seedrandom';

interface EightBallCommandArgs {
  input: string;
}

class EightBallCommand extends Command {
  private answers: string[] = [
    'Certainly so.',
    'Undoubtedly yes!',
    'Definitely.',
    'Very much yes!',
    'Yep!',
    'Most likely, yeah!',
    'Maybe-maybe...',
    'Probably.',
    'I cannot tell you that right now.',
    'Negative.',
    'I think the answer is no.',
    'Not really.',
    'Nope.',
    'No.',
    'Very doubtful.'
  ];

  constructor() {
    super('8ball', {
      aliases: [ '8ball', '8' ],
      description: 'Ask the 8-Ball any question.',
      args: [
        {
          id: 'input',
          prompt: {
            start: 'What is your question?'
          }
        }
      ]
    });
  }

  generateMessage(answer: string): MessageEmbed {
    const embed = new MessageEmbed();
    embed.setTitle(':8ball: The Great 8-Ball says...');
    embed.setDescription(answer);
    return embed;
  }

  exec(message: Message, { input }: EightBallCommandArgs) {
    const rng = seed(input.toLowerCase());
    const answer = this.answers[Math.floor(rng() * this.answers.length)];
    return this.say(message, this.generateMessage(answer));
  }
}

export default EightBallCommand;
