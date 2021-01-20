import firebase, { buildRefQuery } from '../lib/firebase';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';

export interface IExperience {
  member: string;
  guild: string;
  amount: number;
}

export interface ExperienceSnapshot extends DocumentSnapshot {
  data(): IExperience;
}

export interface ExperienceSearchOpts {
  member: string;
  guild: string;
}

export class Experience {
  private member: string = '';
  private guild: string = '';
  private amount: number = 0;

  private static collection = firebase.db.collection('experience');

  constructor(opts?: IExperience) {
    if (opts) {
      this.member = opts.member;
      this.guild = opts.guild;
      this.amount = opts.amount;
    }
  }

  create(): Promise<DocumentReference> {
    const { member, guild, amount } = this;
    return Experience.collection.add({
      member,
      guild,
      amount
    });
  }

  static all(): Promise<ExperienceSnapshot[]> {
    return new Promise((resolve, reject) => {
      return Experience.collection
        .get()
        .then(snapshot => snapshot.docs as ExperienceSnapshot[])
        .then(resolve)
        .catch(reject);
    });
  }

  static findOne(opts: ExperienceSearchOpts): Promise<ExperienceSnapshot | null> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(Experience.collection, opts);

      if (!ref) {
        return reject('Failed to build Experience#findOne query.');
      }

      return ref
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return resolve(null);
          }

          return resolve(snapshot.docs[0] as ExperienceSnapshot);
        })
        .catch(reject);
    });
  }
}
