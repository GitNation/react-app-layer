import firebase from "firebase/app";
import "firebase/database";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyBf7T250-Zw9KKtluwz_5_FCImlyzgcHsg",
  authDomain: "expo-jsn-live.firebaseapp.com",
  databaseURL: "https://expo-jsn-live.firebaseio.com",
  projectId: "expo-jsn-live",
  storageBucket: "expo-jsn-live.appspot.com",
  messagingSenderId: "435859589512",
  appId: "1:435859589512:web:e69ddb814c4d0cc624923d"
};

firebase.initializeApp(config);

export const db = firebase.database();
