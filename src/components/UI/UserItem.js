import React from "react";

// Material UI Components
import Avatar from "@mui/material/Avatar";

// Stylesheets
import styles from "../../styles/UserItem.Module.css";

const stringToColor = (string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
}

const stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const UserItem = props => {
    const {isSelected, name} = props;
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
            <Avatar {...stringAvatar(name)} className={styles.img} />
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
