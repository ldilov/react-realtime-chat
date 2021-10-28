import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set, push, query, get, startAfter, orderByChild} from 'firebase/database';

const LAST_24_HOURS_TIMESTAMP = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).getTime();

const config = {
    apiKey: "AIzaSyDo2SREjeWJrs3M5AkZUyS8Wvl7jEUtR_A",
    authDomain: "chatapp-519c9.firebaseapp.com",
    databaseURL: "https://chatapp-519c9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatapp-519c9",
    storageBucket: "chatapp-519c9.appspot.com",
    messagingSenderId: "811125238064",
    appId: "1:811125238064:web:f8adcb5c4309a2c9f640f5",
    messagesLimit:  5 * 1000,
};

const app = initializeApp(config);

export const auth = app.auth;
export const db = getDatabase(app);

export const setDbListener = (database, callback) => {
    onValue(database, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export const getUserById = (id, callback) => {
    const userRef = ref(db, `users/${id}`);
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export const getUsersFromDb = () => {
    const userRef = ref(db, `users/`);
    const queryUsers = query(userRef);
    return get(queryUsers);
}

export const writeMessageToDb = (userId, content) => {
    set(push(ref(db, 'messages/')), {
        user_id: userId,
        content: content,
        timestamp: {'.sv': 'timestamp'}
    });
}

export const refs = {
    getUsersRef: () => ref(db, 'users/'),
    getMessagesRef: () => query(
        ref(db, 'messages/'),
        orderByChild("timestamp"),
        startAfter(LAST_24_HOURS_TIMESTAMP)
    )
}
