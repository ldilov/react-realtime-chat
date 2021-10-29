import React, {useState} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from "../../styles/ChatBox.Module.css";

// Custom Hooks
import useFocus from "../../hooks/useFocus";
import useCustomStyles from "../../hooks/useCustomStyles";

// Material Components
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

// Actions
import messagesActions from "../../actions/messagesActions";
import inputActions from "../../actions/inputActions";

// Custom components
import InputError from "./InputError";
import useAuth from "../../hooks/useAuth";

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
        await inputSetters.sendMessage(parsedValue, inputSetters.authData.user_id);
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
    const [customStyles] = useCustomStyles();
    const [authData] = useAuth();

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
        setInputFocus,
        authData
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

export default connect(
    null,
    {
        sendMessage: messagesActions.sendMessage,
        setInputValue: inputActions.setInputValue
    }
)(InputForm);
