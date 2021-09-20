import firebase from 'firebase';



let config = {
  apiKey: 'AIzaSyDNXlJ8TNKI5hu--bolE27Fk9zhzO-dMiQ',
  authDomain: 'workhallapp.firebaseapp.com',
  databaseURL: 'https://workhallapp-default-rtdb.firebaseio.com',
  projectId: 'workhallapp',
  storageBucket: 'workhallapp.appspot.com',
  messagingSenderId: '605722696383',
  appId: '1:605722696383:web:e42e2839bc8e458767040a',
  measurementId: 'G-8VG1KVEXLE',
};

let fire = firebase.initializeApp(config);

let db = fire.database();
let auth = fire.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
export {db};
