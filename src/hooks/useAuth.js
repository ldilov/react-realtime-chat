// Services
import {dbAuth, getUserById} from "../services/firebase";
import useLocalStorage from "./useLocalStorage";
import {useEffect} from "react";

// Constants
const LOCAL_STORAGE_KEY = "authUser";

const useAuth = () => {
    const [userData, setUserData] = useLocalStorage(LOCAL_STORAGE_KEY, null);
    const id = dbAuth.currentUser?.uid;

    useEffect(async () => {
       if(id) {
           const result = await getUserById(id);
           setUserData(result.val());
       }
    }, [id])

    return [userData];
}

export default useAuth;
