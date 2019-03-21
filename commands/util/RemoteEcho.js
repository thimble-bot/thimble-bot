const { Command } = require('discord.js-commando');

class RemoteEchoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remoteecho',
      group: 'util',
      memberName: 'remoteecho',
      description: 'Echo something to a server from a different server.',
      guarded: true,
      ownerOnly: true,
      args: [
        {
          key: 'guild',
          type: 'string',
          prompt: 'Server ID'
        },
        {
          key: 'channel',
          type: 'string',
          prompt: 'Channel ID'
        },
        {
          key: 'str',
          type: 'string',
          prompt: 'What do you want to say?'
        }
      ]
    });
  }

  async run(message, { guild, channel, str }) {
    const targetGuild = await this.client.guilds.get(guild);

    if (!targetGuild) {
      return message.say(':warning: Could not find guild.');
    }

    const targetChannel = await targetGuild.channels.get(channel);

    if (!targetChannel) {
      return message.say(':warning: Could not find channel.');
    }

    try {
      await targetChannel.send(str);
      const doneMessage = await message.say('Done!');

      setTimeout(() => {
        doneMessage.delete();
        message.delete();
      }, 2000);

      return null;
    } catch (err) {
      return message.say(':x: Failed to send the message.');
    }
  }
};

module.exports = RemoteEchoCommand;
