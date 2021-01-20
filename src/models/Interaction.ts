import firebase, { buildRefQuery } from '../lib/firebase';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';

export type InteractionType = 'boop' | 'hug' | 'highfive';

export interface IInteraction {
  sender: string;
  receiver: string;
  guild: string;
  counts?: number;
  type: InteractionType;
}

export interface InteractionSearchOpts {
  sender?: string;
  receiver?: string;
  guild: string;
  type: InteractionType;
}

export interface InteractionSnapshot extends DocumentSnapshot {
  data(): IInteraction;
}

export class Interaction {
  private sender: string = '';
  private receiver: string = '';
  private guild: string = '';
  private type: InteractionType = 'boop';

  private static collection = firebase.db.collection('interactions');

  constructor(opts?: IInteraction) {
    if (opts) {
      this.sender = opts.sender;
      this.receiver = opts.receiver;
      this.guild = opts.guild;
      this.type = opts.type;
    }
  }

  create(): Promise<DocumentReference> {
    const { sender, receiver, guild, type } = this;
    return Interaction.collection.add({
      sender,
      receiver,
      guild,
      type,
      counts: 1
    });
  }

  static findOne(opts: InteractionSearchOpts): Promise<InteractionSnapshot | null> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(Interaction.collection, opts);

      if (!ref) {
        return reject('Failed to build Interaction#findOne query.');
      }

      return ref
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return resolve(null);
          }

          return resolve(snapshot.docs[0] as InteractionSnapshot);
        })
        .catch(reject);
    });
  }

  static findAll(opts: InteractionSearchOpts, sortBy: string = '', limit: number = 0): Promise<InteractionSnapshot[]> {
    return new Promise((resolve, reject) => {
      let ref = buildRefQuery(Interaction.collection, opts);

      if (!ref) {
        return reject('Failed to build Interaction#findAll query.');
      }

      if (sortBy.length) {
        ref = sortBy.startsWith('-')
          ? ref.orderBy(sortBy.slice(1), 'desc')
          : ref.orderBy(sortBy);
      }

      if (limit > 0) {
        ref = ref.limit(limit);
      }

      return ref
        .get()
        .then(snapshot => snapshot.docs as InteractionSnapshot[])
        .then(resolve)
        .catch(reject);
    });
  }

  static update(id: string, data: IInteraction) {
    return new Promise((resolve, reject) => {
      return Interaction.collection
        .doc(id)
        .update(data)
        .then(resolve)
        .catch(reject);
    });
  }
}
