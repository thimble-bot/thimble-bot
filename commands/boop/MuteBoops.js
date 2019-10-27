const { Command } = require('discord.js-commando');
const BoopOptout = require('../../db/models/boops/Optout');

const meta = {
  name: 'interact-noping',
  aliases: [ 'interact-disable-ping', 'interact-mute', 'mute-interactions' ],
  description: 'Disable getting pinged by interaction commands. People will still be able to ping/hug/highfive you but you will not get notified by that.'
};

class InteractNoPingCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'boop',
      memberName: 'interact-noping',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 30 * 60
      }
    });
  }

  getCurrentState(userId, guild) {
    return BoopOptout.count({ where: { userId, guild, type: 'mute' } });
  }

  enablePings(userId, guild) {
    return BoopOptout.destroy({ where: { userId, guild, type: 'mute' } });
  }

  disablePings(userId, guild) {
    return BoopOptout.create({ userId, guild, type: 'mute' });
  }

  async toggle(userId, guild) {
    switch (this.currentState) {
      case 0: // pings are enabled
        await this.disablePings(userId, guild);
        break;
      case 1: // pings are disabled
        await this.enablePings(userId, guild);
        break;
    }
  }

  getMessage(author) {
    switch (this.currentState) {
      case 0:
        return `${author.toString()}, interaction command notifications disabled successfully.`;
      case 1:
        return `${author.toString()}, interaction command notificaitons enabled successfully.`;
    }
  }

  async run(message) {
    const userId = message.author.id;
    const guild  = message.guild.id;

    try {
      this.currentState = await this.getCurrentState(userId, guild);

      await this.toggle(userId, guild);

      return message.say(this.getMessage(message.author))
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to toggle boop state.');
    }
  }
};

module.exports = InteractNoPingCommand;
module.exports.meta = meta;
