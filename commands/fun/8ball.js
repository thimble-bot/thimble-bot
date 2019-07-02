const { Command } = require('discord.js-commando');

const meta = {
  name: '8ball',
  description: 'Ask the 8-Ball any question.',
  args: [
    {
      key: 'question',
      type: 'string',
      prompt: 'What is your question?'
    }
  ]
};

class EightBallCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: '8ball'
    });

    this.answers = [
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
  }

  askedIfSomeoneIsCute(query) {
    query = query.toLowerCase();

    if (query.includes('cutie') || query.includes('qt')) {
      return true;
    }

    const split = query.split(/\s+/g);
    return split.length === 3 && split[0] === 'is' && split[2] === 'cute';
  }

  generateAnswer(answer) {
    return {
      embed: {
        title: ':8ball: The Great 8-Ball says...',
        description: answer
      }
    };
  }

  run(message, { question }) {
    const length = this.askedIfSomeoneIsCute(question) ? 5 : this.answers.length;
    const answer = this.answers[Math.floor(Math.random() * length)];
    return message.say(this.generateAnswer(answer));
  }
};

module.exports = EightBallCommand;
module.exports.meta = meta;
