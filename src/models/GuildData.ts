import firebase, { buildRefQuery } from '../lib/firebase';
import { GuildConfig } from '../typings/config';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';
import config from '../config';

export interface IGuildData extends GuildConfig {
  guild: string;
};

export interface GuildDataSnapshot extends DocumentSnapshot {
  data(): IGuildData;
};

export interface GuildDataSearchOpts {
  guild: string;
};

export class GuildData {
  private guild: string;
  private config: IGuildData | null = null;

  private static collection = firebase.db.collection('guilds');

  constructor(guild: string, config?: GuildConfig) {
    this.guild = guild;

    if (config) {
      this.config = {
        ...config,
        guild
      };
    }
  }

  create(): Promise<DocumentReference> {
    if (!this.config) {
      return Promise.reject('Config not initialized.');
    }

    return GuildData.collection.add(this.config);
  }

  static all(): Promise<GuildDataSnapshot[]> {
    return new Promise((resolve, reject) => {
      return GuildData.collection
        .get()
        .then(snapshot => snapshot.docs as GuildDataSnapshot[])
        .then(resolve)
        .catch(reject);
    });
  }

  static findOne(opts: GuildDataSearchOpts): Promise<GuildDataSnapshot | null> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(GuildData.collection, opts);

      if (!ref) {
        return reject('Failed to build GuildData#findOne query.');
      }

      return ref
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return resolve(null);
          }

          return resolve(snapshot.docs[0] as GuildDataSnapshot);
        })
        .catch(reject);
    });
  }

  static update(id: string, data: IGuildData) {
    return new Promise((resolve, reject) => {
      return GuildData.collection
        .doc(id)
        .update(data)
        .then(resolve)
        .catch(reject);
    });
  }

  async updateConfig() {
    const currentConfig = config.guilds?.[this.guild];
    if (!currentConfig) {
      return Promise.resolve();
    }

    this.config = {
      ...currentConfig,
      guild: this.guild
    };

    const doc = await GuildData.findOne({ guild: this.guild });

    if (!doc) {
      return this.create();
    }

    return doc.ref.update(this.config);
  }
}
