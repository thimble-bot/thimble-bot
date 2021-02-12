import { ServiceAccount } from 'firebase-admin';

export interface BotConfig {
  token?: string;
  activity?: string;
  owners?: string[];
  defaultPrefix?: string;
  expUpdateInterval?: number;
  guildConfigUpdateInterval?: number;
};

export interface FirebaseConfig {
  serviceAccount?: ServiceAccount;
  bucket?: string;
};

export interface EXPLevel {
  amount: number;
  roleId: string;
}

interface EXPConfig {
  range: [ from: number, to: number ];
  levels: EXPLevel[];
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
  custom?: any;

  guilds: {
    [guild: string]: GuildConfig;
  }
};
