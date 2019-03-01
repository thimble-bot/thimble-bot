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
          type: 'user|string',
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

  run(message, { user }) {
    if (!user) {
      user = message.author;
    } else {
      user = message.mentions.users.first();

      if (!user) {
        return message.say('You need to tag the user to make sure you get the correct results.');
      }
    }

    return message.say(this.generateEmbed(user));
  }
};

module.exports = UserInfo;
