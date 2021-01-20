import firebase from 'firebase-admin';

import { Firestore, CollectionReference, Query } from '@google-cloud/firestore';
import config from '../config';

const initFirebase = () => {
  if (firebase.apps.length === 0) {
    if (!config.firebase.serviceAccount) {
      throw new Error('Firebase authentication details not provided.');
    }

    firebase.initializeApp({
      credential: firebase.credential.cert(config.firebase.serviceAccount)
    });
  }
};

export const buildRefQuery = (collection: CollectionReference, query: { [key: string]: any }): Query | null => {
  let ref: Query | null = null;

  Object.keys(query).forEach(key => {
    if (query[key] === undefined) {
      return;
    }

    ref = ref
      ? ref.where(key, '==', query[key])
      : collection.where(key, '==', query[key]);
  });

  return ref;
};

class Firebase {
  db: Firestore;

  constructor() {
    initFirebase();

    this.db = firebase.app().firestore();
    this.db.settings({ ignoreUndefinedProperties: false });
  }
}

const firebaseInstance = new Firebase();
export default firebaseInstance;
