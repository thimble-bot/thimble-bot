import { ServiceAccount } from 'firebase-admin';

export interface BotConfig {
  token?: string;
  activity?: string;
  owners?: string[];
  defaultPrefix?: string;
  expUpdateInterval?: number;
};

export interface FirebaseConfig {
  serviceAccount?: ServiceAccount;
  bucket?: string;
};

interface EXPConfig {
  range: [ from: number, to: number ];

  levels: {
    [exp: string]: string;
  };

  ignoreChannels?: string[];
};

export interface GuildConfig {
  prefix?: string;
  djRole?: string;
  exp?: EXPConfig;
};

export interface IConfig {
  bot: BotConfig;
  firebase: FirebaseConfig;

  guilds: {
    [guild: string]: GuildConfig;
  }
};
