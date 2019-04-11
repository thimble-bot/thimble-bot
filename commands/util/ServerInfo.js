const { Command } = require('discord.js-commando');
const dateFormat = require('date-fns').format;

class ServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      group: 'util',
      memberName: 'serverinfo',
      aliases: [ 'server', 'guild', 'guildinfo' ],
      guildOnly: true,
      description: 'Get some information about the current server.'
    });
  }

  generateEmbed(guild) {
    return {
      embed: {
        title: guild.name,
        author: {
          name: this.client.user.tag,
          icon_url: this.client.user.avatarURL
        },
        thumbnail: {
          url: guild.iconURL
        },
        fields: [
          {
            name: 'ID:',
            value: guild.id
          },
          {
            name: 'Created at:',
            value: dateFormat(guild.createdAt, 'dddd, MMMM M, YYYY h:mm A')
          },
          {
            name: 'Member count:',
            value: guild.memberCount,
            inline: true
          },
          {
            name: 'Channel count:',
            value: guild.channels.array().length,
            inline: true
          },
          {
            name: 'Emoji count:',
            value: guild.emojis.array().length,
            inline: true
          },
          {
            name: 'Region:',
            value: guild.region,
            inline: true
          },
          {
            name: 'Owner:',
            value: guild.owner.user.tag,
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: {
          text: '<3'
        }
      }
    };
  }

  run(message) {
    const guild = message.guild;
    return message.say(this.generateEmbed(guild));
  }
};

module.exports = ServerInfoCommand;
