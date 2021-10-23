import React, {useEffect} from "react";

import styles from '../../styles/ChatBox.Module.css'
import MessageResponse from "./MessageResponse";
import MessageSent from "./MessageSent";

import {connect, useSelector} from "react-redux";
import {refs, setDbListener} from "../../services/firebase";
import {fetchMessages} from "../../actions";
import InputForm from "./InputForm";

const ChatBox = props => {
    const {getMessages} = props;
    const messages = useSelector(store => store.messages);

    useEffect(() => {
        setDbListener(refs.getMessagesRef(), (data) => {
            getMessages(data, messages.length);
        });
    }, [getMessages, messages.length]);

    const userMessages = messages
        .filter(msg => msg !== undefined)
        .map(msg => <MessageSent msgId={msg.id} userId={msg.user_id} content={msg.content}/>);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                <ul>
                    <MessageResponse/>
                    {userMessages}
                </ul>
            </div>
            <InputForm />
        </div>
    );
}

export default connect(
    null,
    {
        getMessages: fetchMessages,
    }
)(ChatBox);
