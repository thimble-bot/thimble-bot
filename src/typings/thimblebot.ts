import { AkairoClient, CommandHandler } from 'discord-akairo';
import DisTube from 'distube';
import { IConfig } from './config';

export interface ExperienceMap {
  [guild: string]: {
    [user: string]: number;
  };
};

export interface IThimbleBot extends AkairoClient {
  commandHandler: CommandHandler;
  customCommandHandler: CommandHandler | null;

  distube: DisTube;
  experienceMap: ExperienceMap;
  config: IConfig;
};
