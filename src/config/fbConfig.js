import firebase from 'firebase/app';
import 'firebase/firestore'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdXHiXs383qHCMtflolL4Ed3p8PpmePjI",
    authDomain: "chimanchu-9210d.firebaseapp.com",
    databaseURL: "https://chimanchu-9210d.firebaseio.com",
    projectId: "chimanchu-9210d",
    storageBucket: "chimanchu-9210d.appspot.com",
    messagingSenderId: "588351518812"
  };
  firebase.initializeApp(config);
  firebase.firestore()

  export default firebase;