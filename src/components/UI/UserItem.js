import React from "react";

// Stylesheets
import styles from "../../styles/UserItem.Module.css";

const UserItem = props => {
    const {isSelected} = props;

    const status = {};

    if(props.isOnline) {
        status.class = styles.green;
        status.name = 'online'
    } else {
        status.class = styles.orange;
        status.name = 'offline';
    }

    return (
        <li key={props.id} className={`${styles.sideLi} ${isSelected ? styles['is-active'] : null}`} onClick={props.onClick}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg" alt="" className={styles.img}/>
            <div className={styles.sideDiv}>
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>
                    <span className={`${styles.status} ${status.class}`}></span>
                    <span>{status.name}</span>
                </h3>
            </div>
        </li>
    );
}

export default UserItem;
