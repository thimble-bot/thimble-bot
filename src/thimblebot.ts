import config from './config';

import * as path from 'path';
import * as fs from 'fs';

import { AkairoClient, CommandHandler } from 'discord-akairo';
import { ExperienceMap, IThimbleBot } from './typings/thimblebot';

import prefix from './lib/prefix';

import DisTube from 'distube';
import onPlaySong from './lib/music/events/playSong';
import onAddSong from './lib/music/events/addSong';
import onSearchResult from './lib/music/events/searchResult';
import onSearchCancel from './lib/music/events/searchCancel';
import onMusicError from './lib/music/events/onMusicError';

import registerEvents from './lib/registerEvents';
import { IConfig } from './typings/config';
import { generateCommandList } from './lib/commandList';

import {
  globalUserResolver,
  partialMemberResolver,
  partialMembersResolver
} from './resolvers';

const CUSTOM_COMMANDS_PATH = path.join(__dirname, '../config/commands');

class ThimbleBot extends AkairoClient implements IThimbleBot {
  commandHandler: CommandHandler;
  customCommandHandler: null | CommandHandler = null;

  config: IConfig = config;
  distube: DisTube;
  experienceMap: ExperienceMap = {};

  constructor() {
    super({
      ownerID: config.bot.owners
    }, {
      disableMentions: 'everyone'
    });

    this.distube = new DisTube(this, {
      searchSongs: true,
      emitNewSongOnly: true,
      leaveOnFinish: true
    });

    this.commandHandler = new CommandHandler(this, {
      directory: path.resolve(__dirname, 'commands'),
      automateCategories: true,
      prefix,
      loadFilter: f => !f.endsWith('.d.ts')
    });

    this.commandHandler.resolver.addType('globalUser', globalUserResolver(this));
    this.commandHandler.resolver.addType('partialMember', partialMemberResolver);
    this.commandHandler.resolver.addType('partialMembers', partialMembersResolver);

    this.commandHandler.loadAll();

    this.distube.on('playSong', onPlaySong);
    this.distube.on('addSong', onAddSong);
    this.distube.on('searchResult', onSearchResult);
    this.distube.on('searchCancel', onSearchCancel);
    this.distube.on('error', onMusicError);

    registerEvents(this);

    if (fs.existsSync(CUSTOM_COMMANDS_PATH)) {
      this.customCommandHandler = new CommandHandler(this, {
        directory: path.resolve(CUSTOM_COMMANDS_PATH),
        automateCategories: true,
        prefix,
        loadFilter: f => !f.endsWith('.d.ts')
      });

      this.customCommandHandler.loadAll();
    }

    generateCommandList(this.commandHandler.modules.array());
  }
}

export default ThimbleBot;
