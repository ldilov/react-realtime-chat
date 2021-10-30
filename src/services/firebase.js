import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set, push, query, get, startAfter, orderByChild} from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

export const db = getDatabase(app);

const auth = getAuth();

export const dbAuth = auth;

export const createUser = (username, firstName, lastName, email, password, callback) => {
    let user = null;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            user = userCredential.user;
            try {
                await set(ref(db, `users/${user.uid}`), {
                    user_id: user.uid,
                    created_at: user.metadata.createdAt,
                    last_login_at: user.metadata.lastLoginAt,
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    isOnline: false
                });
                callback(true);
            } catch(err) {
                callback(null, err);
            }
        })
        .catch((error) => {
            callback(null, error.code);
        });
};

export const loginUser = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const result = await get(ref(db, `users/${user.uid}`));
            callback(result.val(), null)
        })
        .catch((err) => {
            callback(null, err);
        });
}

export const signOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out successfully!");
        })
        .catch(() => {
            console.error("Error during signing out!")
        });
}

export const setDbListener = (database, callback) => {
    onValue(database, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export const getUserById = (id) => {
    const userRef = ref(db, `users/${id}`);
    return get(userRef);
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
