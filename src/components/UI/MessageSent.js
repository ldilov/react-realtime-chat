import React from "react";
import {useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/MessageSent.Module.css';


const MessageSent = props => {
    const {userId, content, msgId} = props;
    const users = useSelector(store => store.users.displayUsers);

    const currentMessageUser = users[userId];

    if(!currentMessageUser?.username){
        return null;
    }

    return (
        <li key={msgId} className={styles.li}>
            <div className={styles.entity}>
                <span className={styles.status}></span>
                <h2 className={styles.h2}>{currentMessageUser.username}</h2>
                <h3 className={styles.h3}>10:12AM, Today</h3>
            </div>
            <div className={styles.msgContainer}>
                <div className={styles.triangle}></div>
                <div className={styles.message}>
                    {content}
                </div>
            </div>
        </li>
    );
}

export default MessageSent;
