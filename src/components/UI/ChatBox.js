import React, {useEffect, useRef} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/ChatBox.Module.css'

// Material UI Components
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";

// Custom components
import Message from "./Message";
import InputForm from "./InputForm";

// Services
import {refs, setDbListener} from "../../services/firebase";

// Actions
import msgActions from "../../actions/messagesActions";

const playNotification = async () => {
    const notificationSound = new Audio('/sounds/msg-sound.mp3');
    notificationSound.crossOrigin ='anonymous';
    return notificationSound.play();
}

const ChatBox = props => {
    const {getMessages} = props;

    const messagesEndRef = useRef();
    const messageContainer = useRef();
    const prevMessagesCountRef = useRef();

    const messages = useSelector(store => store.messages.messages);
    const selectedMessages = useSelector(store => store.messages.selectedMessages);

    useEffect(() => {
        if(prevMessagesCountRef.current < messages.length){
            playNotification();
        }
        prevMessagesCountRef.current = messages.length;
    }, [messages])

    useEffect(() => {
        setDbListener(refs.getMessagesRef(), (data) => {
            if(selectedMessages.length === 0){
                getMessages(data, messages.length);
            }
        });
    }, [getMessages, messages.length, selectedMessages.length]);

    useEffect(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    });

    const messagesList = selectedMessages.length > 0
        ? selectedMessages
        : messages;

    const userMessages = messagesList
        .filter(msg => msg !== undefined)
        .map(msg => {
            return (
                <Slide key={msg.id} direction="up" in={true} container={messageContainer.current}>
                    <Box>
                        <Message msgId={msg.id} userId={msg.user_id} content={msg.content}/>
                    </Box>
                </Slide>
            );
        });

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat} ref={messagesEndRef}>
                <Box ref={messageContainer}>
                    <ul>
                        {userMessages}
                    </ul>
                </Box>
                <div  />
            </div>
            <InputForm />
        </div>
    );
}

export default connect(
    null,
    {
        getMessages: msgActions.fetchMessages,
        selectMessages: msgActions.selectMessages
    }
)(ChatBox);
