import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: 'AIzaSyDvGCfd45wwjqhsb20d7O94GGt9-VvQsEc',
  authDomain: 'gn-watch-app.firebaseapp.com',
  projectId: 'gn-watch-app',
  storageBucket: 'gn-watch-app.appspot.com',
  messagingSenderId: '135946506727',
  appId: '1:135946506727:web:e1976fc4ddef592a7fed42',
  measurementId: 'G-DH7WHJXKGQ',
};

console.log('initializeApp');

firebase.initializeApp(config);
firebase.analytics();

export const db = firebase.database();
