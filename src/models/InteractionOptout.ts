import firebase, { buildRefQuery } from '../lib/firebase';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';

export type InteractionOptoutType = 'boop' | 'hug' | 'highfive' | 'mute';

export interface IInteractionOptout {
  user: string;
  guild: string;
  type: InteractionOptoutType;
}

interface InteractionOptoutSearchOpts {
  user: string;
  guild: string;
  type?: InteractionOptoutType;
}

export interface InteractionOptoutSnapshot extends DocumentSnapshot {
  data(): IInteractionOptout;
}

export class InteractionOptout {
  private user: string = '';
  private guild: string = '';
  private type: InteractionOptoutType = 'boop';

  private static collection = firebase.db.collection('interaction-optouts');

  constructor(opts?: IInteractionOptout) {
    if (opts) {
      this.user = opts.user;
      this.guild = opts.guild;
      this.type = opts.type;
    }
  }

  create(): Promise<DocumentReference> {
    const { user, guild, type } = this;
    return InteractionOptout.collection.add({
      user,
      guild,
      type
    });
  }

  static findOne(opts: InteractionOptoutSearchOpts): Promise<InteractionOptoutSnapshot | null> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(InteractionOptout.collection, opts);

      if (!ref) {
        return reject('Failed to build Interaction#findOne query.');
      }

      return ref
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return resolve(null);
          }

          return resolve(snapshot.docs[0] as InteractionOptoutSnapshot);
        })
        .catch(reject);
    });
  }

  static findAll(opts: InteractionOptoutSearchOpts): Promise<InteractionOptoutSnapshot[]> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(InteractionOptout.collection, opts);

      if (!ref) {
        return reject('Failed to build InteractionOptout#findAll query.');
      }

      return ref
        .get()
        .then(snapshot => snapshot.docs as InteractionOptoutSnapshot[])
        .then(resolve)
        .catch(reject);
    });
  }

  static destroy(id: string) {
    return new Promise((resolve, reject) => {
      return InteractionOptout.collection
        .doc(id)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }
}
