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

    notificationSound.oncanplaythrough = async () => {
        try {
            await notificationSound.play();
        } catch (e) {
            console.log("Autoplay not allowed");
        }
    }
}

const ChatBox = props => {
    const {getMessages} = props;

    const messagesEndRef = useRef();
    const messageContainer = useRef();
    const prevMessagesCountRef = useRef();

    const messages = useSelector(store => store.messages.messages);
    const selectedMessages = useSelector(store => store.messages.selectedMessages);
    const selectedUsers = useSelector(store => store.users.selectedUsers);

    useEffect(() => {
        if(prevMessagesCountRef.current < messages.length){
            playNotification();
        }
        prevMessagesCountRef.current = messages.length;
    }, [messages])

    useEffect(() => {
        setDbListener(refs.getMessagesRef(), (data) => {
            if(selectedMessages.length === 0){
                getMessages(data, true);
            }
        });
    }, [getMessages, messages.length, selectedMessages.length]);

    useEffect(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    });

    const messagesList = selectedUsers.length > 0
        ? selectedMessages
        : messages;

    const userMessages = messagesList
        .filter(msg => msg !== undefined)
        .map(msg => {
            return (
                <Slide key={btoa(msg.id)} direction="up" in={true} container={messageContainer.current}>
                    <Box>
                        <Message msgId={msg.id} userId={msg.user_id} content={msg.content} timestamp={msg.timestamp}/>
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
