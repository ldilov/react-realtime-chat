import React, {useEffect} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/ChatBox.Module.css'

// Custom components
import MessageResponse from "./MessageResponse";
import MessageSent from "./MessageSent";
import InputForm from "./InputForm";

// Services
import {refs, setDbListener} from "../../services/firebase";

// Actions
import msgActions from "../../actions/messagesActions";

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
        getMessages: msgActions.fetchMessages,
    }
)(ChatBox);
