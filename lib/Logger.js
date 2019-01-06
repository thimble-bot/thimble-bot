const config = require('../config').bot;

/**
 * @typedef EmbedOpts
 * @property {string} title
 * @property {Guild} guild
 * @property {Channel} channel
 * @property {string} content 
 */
/**
 * Generates an embed.
 * @param {EmbedOpts} opts
 * @returns {object}
 */
const embed = ({ title, guild, channel, author, content }) => {
  return {
    embed: {
      title,
      author: {
        name: author.username,
        icon_url: author.avatarURL
      },
      thumbnail: {
        url: author.avatarURL
      },
      fields: [
        {
          name: 'Guild',
          value: `${guild.name} (${guild.id})`
        },
        {
          name: 'Channel',
          value: `${channel.name} (${channel.id})`
        },
        {
          name: 'Original message',
          value: content
        }
      ],
      timestamp: new Date(),
      footer: {
        text: '<3'
      }
    }
  };
}

/**
 * Logs the command and some information about it.
 * @param {CommandoClient} client
 * @param {CommandMessage} message
 */
module.exports = (client, message, command) => {
  if (config.logging && config.logging.enabled && config.logging.channel) {
    const output = embed({
      title: command,
      guild: message.guild,
      channel: message.channel,
      author: message.author,
      content: message.content
    });

    return client.guilds.get(config.guild).channels.get(config.logging.channel).send(output);
  }
};
