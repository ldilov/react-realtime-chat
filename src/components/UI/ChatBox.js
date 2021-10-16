import React, {useState} from "react";

import styles from '../../styles/ChatBox.Module.css'
import MessageResponse from "./MessageResponse";
import MessageSent from "./MessageSent";

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const ChatBox = props => {
    const [loading, setLoading] = useState(false);
    function handleClick() {
        setLoading(true);
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                <ul>
                    <MessageResponse />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                    <MessageSent />
                </ul>
            </div>
            <div className={styles.input}>
                <div className={styles.form}>
                    <textarea
                        placeholder='Type your message here'
                        autoFocus>
                    </textarea>
                </div>
                <div className={styles.submit}>
                    <LoadingButton
                        sx={{...customStyles.LoadingButton}}
                        onClick={handleClick}
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Send
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
}

const customStyles = {
    LoadingButton: {
        borderRadius: "10px",
        backgroundColor: "inherit",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "9px 18px",
        fontSize: "16px",
        "&:hover": {
            background: "#03e9f4",
            color: "#141e30",
            borderRadius: "5px",
            boxShadow: "0 0 5px #03e9f4, 0 0 15px #03e9f4, 0 0 2px #03e9f4, 0 0 1px #03e9f4",
        },
    }
}

export default ChatBox;
