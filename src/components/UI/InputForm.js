import React, {useRef, useState} from "react";
import styles from "../../styles/ChatBox.Module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {connect, useSelector} from "react-redux";
import {sendMessage, setInputValue} from "../../actions";
import InputError from "./InputError";

const MIN_MESSAGE_LENGTH = 3;

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

const handleClick = async (inputSetters, value) => {
    const errors = validateMessage(value);
    await inputSetters.setIsLoading(true);

    if(errors.length > 0){
        inputSetters.setErrors(errors)
    } else {
        await inputSetters.setInputValue('');
        await inputSetters.sendMessage(value);
    }

    await inputSetters.setIsLoading(false);
}

const InputForm = props => {
    const {sendMessage, setInputValue} = props;
    const inputValue = useSelector(store => store.inputForm);

    const inputFieldRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const inputSetters = {
        setErrors,
        setIsLoading,
        sendMessage,
        setInputValue
    };

    return (
        <div className={styles.input}>
            <div className={styles.form}>
                    <textarea
                        ref={inputFieldRef}
                        placeholder='Type your message here'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus>
                    </textarea>
            </div>
            <InputError errors={errors} updateErrors={setErrors} inputRef={inputFieldRef.current} />
            <div className={styles.submit}>
                <LoadingButton
                    sx={{...customStyles.LoadingButton}}
                    onClick={(e) => handleClick(inputSetters, inputValue)}
                    endIcon={<SendIcon/>}
                    loading={isLoading}
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
    }
}

export default connect(
    null,
    {
        sendMessage: sendMessage,
        setInputValue: setInputValue
    }
)(InputForm);
