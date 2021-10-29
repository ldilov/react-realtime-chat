import React from "react";
import Linkify from 'react-linkify';
import moment from 'moment';
import {useSelector} from "react-redux";

import useMessageStyles from "../../hooks/useMessageStyles";

const parseMessage = (content) => {
    return (
        <Linkify>{content}</Linkify>
    )
};

const parseDate = (timestamp) => {
    const date = new Date(timestamp);
    let format = `H:mm:ss, dddd`;

    if(date.getDay() === new Date().getDay()){
        format = `H:mm:ss, [Today]`;
    }

    const dateFormatted = moment(
        {
            hour: date.getHours(),
            minute: date.getMinutes(),
            seconds: date.getSeconds()
        }
    ).format(format);

    return dateFormatted;
}

const Message = props => {
    const {userId, content, timestamp} = props;
    const {styles} = useMessageStyles(userId);

    const users = useSelector(store => store.users.dbUsers);

    const formattedDate = parseDate(timestamp);
    const currentMessageUser = users.find(u => u.id === userId);

    if(!currentMessageUser?.username || !content){
        return null;
    }

    return (
        <li className={styles.li}>
            <div className={styles.entity}>
                <span className={styles.status}></span>
                <h2 className={styles.h2}>{currentMessageUser.username}</h2>
                <h3 className={styles.h3}>{formattedDate}</h3>
            </div>
            <div className={styles.msgContainer}>
                <div className={styles.triangle}></div>
                <div className={styles.message}>
                    {parseMessage(content)}
                </div>
            </div>
        </li>
    );
};

export default React.memo(
    Message,
    (prevProps, nextProps) => {
        return prevProps.msgId === nextProps.msgId
            && prevProps.userId === nextProps.userId;
    }
);

