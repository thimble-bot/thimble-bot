const { Command } = require('discord.js-commando');
const config = require('../../config');
const dateFormat = require('date-fns').format;

class UserInfo extends Command {
  constructor(client) {
    super(client, {
      name: 'user',
      group: 'fun',
      memberName: 'user',
      aliases: [ 'userinfo', 'profile' ],
      guildOnly: true,
      description: 'Get info about a user.',
      examples: [ `${config.bot.prefix}user @username#discrim` ],
      args: [
        {
          key: 'user',
          type: 'user',
          default: '',
          prompt: 'Please provide a user.'
        }
      ]
    });
  }

  generateEmbed(user) {
    return {
      embed: {
        title: `${user.username} - information`,
        author: {
          name: user.tag,
          icon_url: user.avatarURL
        },
        thumbnail: {
          url: user.avatarURL
        },
        fields: [
          {
            name: 'Username',
            value: user.username
          },
          {
            name: 'Discriminator',
            value: user.discriminator
          },
          {
            name: 'Joined Discord',
            value: dateFormat(user.createdAt, 'dddd, MMMM M, YYYY h:mm A')
          },
          {
            name: 'User ID',
            value: user.id
          }
        ],
        timestamp: new Date(),
        footer: {
          text: '<3'
        }
      }
    };
  }

  async run(message, { user }) {
    if (!user) {
      return message.say(this.generateEmbed(message.author));
    }

    if (user && user.id) {
      return message.say(this.generateEmbed(user));
    }

    return message.say(':x: User not found.');
  }
};

module.exports = UserInfo;
