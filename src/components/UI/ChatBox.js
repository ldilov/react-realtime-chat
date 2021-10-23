import React, {useEffect, useLayoutEffect, useRef} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/ChatBox.Module.css'

// Custom components
import Message from "./Message";
import InputForm from "./InputForm";

// Services
import {refs, setDbListener} from "../../services/firebase";

// Actions
import msgActions from "../../actions/messagesActions";
import {Slide} from "@mui/material";
import Box from "@mui/material/Box";

const ChatBox = props => {
    const {getMessages} = props;

    const messagesEndRef = useRef();
    const messageContainer = useRef();

    const messages = useSelector(store => store.messages);

    useEffect(() => {
        setDbListener(refs.getMessagesRef(), (data) => {
            getMessages(data, messages.length);
        });
    }, [getMessages, messages.length]);

    useLayoutEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    });

    const userMessages = messages
        .filter(msg => msg !== undefined)
        .map(msg => {
            return (
                <Slide direction="up" in={true} container={messageContainer.current}>
                    <Box>
                        <Message msgId={msg.id} userId={msg.user_id} content={msg.content}/>
                    </Box>
                </Slide>
            );
        });

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                <Box ref={messageContainer}>
                    <ul>
                        {userMessages}
                    </ul>
                </Box>
                <div ref={messagesEndRef} />
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
