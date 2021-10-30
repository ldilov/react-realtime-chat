// Services
import {dbAuth, getUserById, signOutUser} from "../services/firebase";
import useLocalStorage from "./useLocalStorage";
import {useCallback, useEffect} from "react";

// Constants
const LOCAL_STORAGE_KEY = "authUser";

const useAuth = () => {
    const [userData, setUserData, unsetUserData] = useLocalStorage(LOCAL_STORAGE_KEY, null);
    const id = dbAuth.currentUser?.uid;

    useEffect(() => {
        (async () => {
            if(id) {
                const result = await getUserById(id);
                setUserData(result.val());
            }
        })();
    }, [id])

    useEffect(() => {
        (async () => {
            const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if(!localData) {
                unsetUserData();
            }
        })();
    });

    const authDestroy = useCallback(() => {
        (async () => {
            await signOutUser();
            await unsetUserData();
        })();
    }, [unsetUserData]);

    return [userData, authDestroy ];
}

export default useAuth;
