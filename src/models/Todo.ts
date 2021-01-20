import firebase, { buildRefQuery } from '../lib/firebase';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';

export interface ITodo {
  userId: string;
  guildId?: string;
  todo: string;
  completed: boolean;
}

export interface IListOpts {
  userId: string;
  guildId?: string;
}

interface TodoSnapshot extends DocumentSnapshot {
  data(): ITodo;
}

export class Todo {
  private userId: string = '';
  private guildId?: string;
  private todo: string = '';
  private completed: boolean = false;

  private static collection = firebase.db.collection('todos');

  constructor(opts?: ITodo) {
    if (opts) {
      this.userId = opts.userId;
      this.guildId = opts.guildId;
      this.todo = opts.todo;
      this.completed = opts.completed;
    }
  }

  create(): Promise<DocumentReference> {
    const { userId, guildId, todo, completed } = this;
    return Todo.collection.add({
      userId,
      guildId,
      todo,
      completed
    });
  }

  static list(opts: IListOpts): Promise<TodoSnapshot[]> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(Todo.collection, opts);

      if (!ref) {
        return reject('Failed to build Todo#list query.');
      }

      return ref
        .get()
        .then(snapshot => snapshot.docs as TodoSnapshot[])
        .then(resolve)
        .catch(reject);
    });
  }

  static count(opts: IListOpts): Promise<number> {
    return new Promise((resolve, reject) => {
      const ref = buildRefQuery(Todo.collection, opts);

      if (!ref) {
        return reject('Failed to build Todo#count query.');
      }

      return ref
        .get()
        .then(snapshot => resolve(snapshot.size))
        .catch(reject);
    });
  }
}
