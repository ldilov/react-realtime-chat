import React from "react";

import ChatBox from "./UI/ChatBox";

import styles from '../styles/App.Module.css';
import SideBar from "./UI/SideBar";

const App = props => {
    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.main}>
                <ChatBox />
            </div>
        </div>
    );
}

export default App;
