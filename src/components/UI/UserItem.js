import React from "react";

import styles from "../../styles/UserItem.Module.css";

const UserItem = props => {
    return (
        <li className={styles.sideLi}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg" alt="" className={styles.img}/>
            <div className={styles.sideDiv}>
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>
                    <span className={`${styles.status} ${styles.orange}`}></span>
                    <span>offline</span>
                </h3>
            </div>
        </li>
    );
}

export default UserItem;
