import {writeMessageToDb} from "../services/firebase";

const fetchMessages = (messages) => {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_MESSAGES',
            payload: messages
        });
    };
};

const sendMessage = (message) => {
    return async (dispatch) => {
        try {
            await writeMessageToDb(1, message);
            dispatch({
                type: 'SEND_MESSAGE',
                payload: message
            });
        } catch (err) {
            console.log(err)
        }
    };
};

const moduleData = {
    sendMessage,
    fetchMessages
};

export default moduleData;
