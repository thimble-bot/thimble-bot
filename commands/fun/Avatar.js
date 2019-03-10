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
          type: 'user|string',
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

    try {
      let targetUser;

      if (isNaN(user)) {
        targetUser = await message.guild.fetchMembers()
          .then(members => members.filter(m => (m.user.username === user || m.nickname === user)))
          .then(members => members.first);
      } else {
        targetUser = await message.guild.fetchMember(user);
      }

      return message.say('', this.generateAttachment(targetUser));
    } catch (err) {
      return message.say(':x: User not found.');
    }
  }
};

module.exports = AvatarCommand;
