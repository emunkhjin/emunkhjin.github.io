import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyA8yEtEb43d9vKJ68QevCceu025047Xd6Q",
  authDomain: "iroad-d0ce7.firebaseapp.com",
  databaseURL: "https://iroad-d0ce7.firebaseio.com",
  projectId: "iroad-d0ce7",
  storageBucket: "iroad-d0ce7.appspot.com",
  messagingSenderId: "1094036965431",
  appId: "1:1094036965431:web:1bc7ad3bce265a8f7fd7b2"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
