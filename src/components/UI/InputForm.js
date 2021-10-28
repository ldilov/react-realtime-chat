import React, {useState} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from "../../styles/ChatBox.Module.css";

// Material Components
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

// Actions
import messagesActions from "../../actions/messagesActions";
import inputActions from "../../actions/inputActions";

// Custom components
import InputError from "./InputError";
import useFocus from "../../hooks/useFocus";

const MIN_MESSAGE_LENGTH = 1;

const validateMessage = (value) => {
    const errors = [];

    if(!value) {
        errors.push("Message can not be empty!");
    }

    if(value.length <= MIN_MESSAGE_LENGTH) {
        errors.push(`Message can not be less than ${MIN_MESSAGE_LENGTH} characters.`)
    }

    return errors;
}

const parseMessage = (value) => {
    // TODO: implement

    return value;
}

const handleSubmit = async (inputSetters, value) => {
    const parsedValue = parseMessage(value.trim());

    const errors = validateMessage(parsedValue);

    await inputSetters.setIsInputEnabled(false);
    await inputSetters.setInputValue('');

    if(errors.length > 0){
        inputSetters.setErrors(errors)
    } else {
        await inputSetters.sendMessage(parsedValue);
        inputSetters.setErrors([]);
    }

    await inputSetters.setIsInputEnabled(true);
    await inputSetters.setInputFocus();
}

const handleClick = async (inputSetters, value) => {
    await handleSubmit(inputSetters, value);
}

const handleKeyPress = async (inputSetters, value, event) => {
    if(event.code === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        await handleSubmit(inputSetters, value);
    }
}

const InputForm = props => {
    const {sendMessage, setInputValue} = props;

    const inputValue = useSelector(store => store.inputForm);
    const isMessageSending = useSelector(store => store.messages.isSendingInProgress);

    const [inputFieldRef, setInputFocus] = useFocus()
    const [isInputEnabled, setIsInputEnabled] = useState(true);
    const [errors, setErrors] = useState([]);

    const inputSetters = {
        setErrors,
        sendMessage,
        setInputValue,
        setIsInputEnabled,
        setInputFocus
    };

    return (
        <div className={styles.input}>
            <div className={styles.form}>
                    <textarea
                        ref={inputFieldRef}
                        disabled={!isInputEnabled}
                        placeholder='Type your message here'
                        value={inputValue}
                        onKeyPress={(e) => handleKeyPress(inputSetters, inputValue, e)}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus>
                    </textarea>
            </div>
            <InputError errors={errors} updateErrors={setErrors} inputRef={inputFieldRef.current} />
            <div className={styles.submit}>
                <LoadingButton
                    sx={{...customStyles.LoadingButton}}
                    onClick={() => handleClick(inputSetters, inputValue)}
                    endIcon={<SendIcon/>}
                    loading={isMessageSending}
                    loadingPosition="end"
                    variant="contained"
                >
                    Send
                </LoadingButton>
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
        "&:disabled": {
            background: "#03e9f4",
            color: "#141e30",
        }
    }
}

export default connect(
    null,
    {
        sendMessage: messagesActions.sendMessage,
        setInputValue: inputActions.setInputValue
    }
)(InputForm);
