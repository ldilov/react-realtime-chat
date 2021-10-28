import {writeMessageToDb} from "../services/firebase";

const fetchMessages = (messages) => {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_MESSAGES',
            payload: messages
        });
    };
};

const selectMessages = (messages, index) => {
    const filteredMessages = messages.filter(
        msg => msg && msg.user_id === index
    );

    return (dispatch) => {
        dispatch({
            type: 'SELECT_MESSAGES',
            payload: filteredMessages
        });
    };
};

const deselectMessages = () => {
    return (dispatch) => {
        dispatch({
            type: 'DESELECT_MESSAGES',
            payload: null
        });
    };
};

const sendMessage = (message) => {
    return async () => {
        try {
            await writeMessageToDb('dwqeqwr', message);
            // dispatch({
            //     type: 'SEND_MESSAGE',
            //     payload: message
            // });
        } catch (err) {
            console.log(err)
        }
    };
};

const moduleData = {
    sendMessage,
    fetchMessages,
    selectMessages,
    deselectMessages
};

export default moduleData;
