import config from '../config';

import { GuildData } from '../models/GuildData';
import { GuildConfig } from '../typings/config';

import omit from 'lodash.omit';

type GuildConfigKey = 'exp' | 'djRole' | 'prefix';

const updateGuildConfig = (guildId: string, key: GuildConfigKey, value: any) => {
  if (!Object.keys(config.guilds).includes(guildId)) {
    config.guilds[guildId] = {};
  }

  config.guilds[guildId][key] = value;
};

const initGuildConfigs = async () => {
  const guildConfigs = await GuildData.all();
  if (guildConfigs?.length) {
    guildConfigs.forEach(snapshot => {
      const doc = snapshot.data();
      config.guilds[doc.guild] = <GuildConfig>omit(doc, 'guild');
    });
  }
};

export {
  updateGuildConfig,
  initGuildConfigs
};
