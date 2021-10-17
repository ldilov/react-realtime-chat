import React from "react";
import ChatBox from "./UI/ChatBox";
import SideBar from "./UI/SideBar";
import styles from '../styles/App.Module.css';

const App = props => {
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
