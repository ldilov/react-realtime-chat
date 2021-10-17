import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref} from 'firebase/database';

const config = {
    apiKey: "AIzaSyDo2SREjeWJrs3M5AkZUyS8Wvl7jEUtR_A",
    authDomain: "chatapp-519c9.firebaseapp.com",
    databaseURL: "https://chatapp-519c9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatapp-519c9",
    storageBucket: "chatapp-519c9.appspot.com",
    messagingSenderId: "811125238064",
    appId: "1:811125238064:web:f8adcb5c4309a2c9f640f5"
};

const app = initializeApp(config);

export const auth = app.auth;
export const db = getDatabase(app);

export const setDbListener = (database) => {
    onValue(database, (snapshot) => {
        const data = snapshot.val();
        console.log(data[1]);
    });
}

export const refs = {
    getUsersRef: () => ref(db, 'users/')
}
