import React, {useEffect} from "react";
import { refs, setDbListener } from '../services/firebase';
import ChatBox from "./UI/ChatBox";
import SideBar from "./UI/SideBar";
import styles from '../styles/App.Module.css';

const App = props => {
    useEffect(() => {
        try{
            setDbListener(refs.getUsersRef());
        }catch(err) {
            console.error(err)
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <SideBar />
            </div>
            <div className={styles.main}>
                <ChatBox />
            </div>
        </div>
    );
}

export default App;
