import * as firebase from 'firebase';

const config = {
apiKey: "AIzaSyAB1Npr_1nhzbNPQ8pIHYWujJLegePMvyk",
authDomain: "myauth-d63ad.firebaseapp.com",
databaseURL: "https://myauth-d63ad.firebaseio.com",
projectId: "myauth-d63ad",
storageBucket: '',
messagingSenderId: "704362246246",
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
