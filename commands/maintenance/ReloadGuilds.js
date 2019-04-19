const { Command } = require('discord.js-commando');
const Guild = require('../../db/models/guilds/Guild');
const forEachAsync = require('../../lib/forEachAsync');

class ReloadGuildsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reloadguilds',
      group: 'maintenance',
      memberName: 'reloadguilds',
      description: 'Reloads all guilds in the database (adding guilds that have not been added).',
      guarded: true,
      ownerOnly: true
    });
  }

  isAlreadyAdded(guildId) {
    return new Promise((resolve, reject) => {
      return Guild.count({ where: { guildId } })
        .then(ct => {
          if (ct > 0) {
            return resolve(true);
          }

          return resolve(false);
        })
        .catch(err => reject(err));
    });
  }

  add(guildId) {
    return Guild.create({ guildId }).catch(err => console.error(err));
  }

  async run(message) {
    const waiting = await message.say('Processing...');
    let counter = 0;

    await forEachAsync(this.client.guilds.array(), async guild => {
      const guildId = guild.id;

      try {
        const isAlreadyAdded = await this.isAlreadyAdded(guildId);

        if (!isAlreadyAdded) {
          await this.add(guildId);
          counter++;
        }
      } catch (err) {
        console.error(err);
        return message.say(':x: Fail.');
      }
    });

    const response = counter > 0
      ? `:white_check_mark: Done! Added **${counter}** server${(counter === 1 ? '' : 's')} to the database.`
      : ':white_check_mark: Done! No new servers added.';

    await waiting.delete();
    return message.say(response);
  }
};

module.exports = ReloadGuildsCommand;
