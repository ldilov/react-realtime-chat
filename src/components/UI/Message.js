import React from "react";
import {useSelector} from "react-redux";

import useMessageStyles from "../../hooks/useMessageStyles";

const Message = props => {
    const {userId, content} = props;
    const {styles} = useMessageStyles(userId);

    const users = useSelector(store => store.users.displayUsers);

    const currentMessageUser = users.find(u => u.id === userId);

    if(!currentMessageUser?.username || !content){
        return null;
    }

    return (
        <li className={styles.li}>
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

export default Message;
