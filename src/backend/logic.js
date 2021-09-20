import {ColorPropType} from 'react-native';
import firebase, {db} from './config';

export const getRoomOneMeetings = callback => {
  return new Promise((resolve, reject) => {
    let arr = [];
    let key = [];
    firebase
      .database()
      .ref('allMeetings/')
      .orderByKey()
      .on('value', snapShot => {
        // resolve(snapShot.val());
        console.log('====================================');
        console.log(snapShot.val());
        console.log('====================================');
        callback(snapShot.val());
      });
  });
};
export const offRef = () => {
  firebase.database().ref('allMeetings/').off();
};
