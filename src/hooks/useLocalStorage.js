import {useState} from "react";

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log("Error settings local storage value!")
        }
    };

    const unsetValue = () => {
        try {
            setStoredValue(null);
            window.localStorage.removeItem(key);
        } catch (err) {
            console.log("Error deleting from local storage!");
        }
    }

    return [storedValue, setValue, unsetValue];
}

export default useLocalStorage;
