const { Command } = require('discord.js-commando');

class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: 'fun',
      memberName: 'avatar',
      description: 'Get the avatar of a certain user.',
      args: [
        {
          key: 'user',
          prompt: 'Please provide a user.',
          type: 'user',
          default: ''
        }
      ]
    });
  }

  extension(str) {
    return str
      .split('.')
      .pop()
      .split('?')
      .shift();
  }

  generateAttachment(user) {
    return {
      file: {
        attachment: user.avatarURL,
        name: `avatar.${this.extension(user.avatarURL)}`
      }
    };
  }

  async run(message, { user }) {
    if (!user) {
      user = message.author;
    }

    if (user && user.id) {
      return message.say('', this.generateAttachment(user));
    }

    return message.say(':x: User not found.');
  }
};

module.exports = AvatarCommand;
