import React from "react";

import styles from '../../styles/MessageResponse.Module.css';

const MessageResponse = props => {
    return (
        <li className={styles.li}>
            <div className={styles.entity}>
                <span className={styles.status}></span>
                <h2 className={styles.h2}>Lazar</h2>
                <h3 className={styles.h3}>10:12AM, Today</h3>
            </div>
            <div className={styles.msgContainer}>
                <div className={styles.triangle}></div>
                <div className={styles.message}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </div>
        </li>
    );
}

export default MessageResponse;
