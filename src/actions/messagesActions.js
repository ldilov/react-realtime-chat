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
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SEND_MESSAGE_START',
                payload: null
            });

            await new Promise((resolve) => {
                return setTimeout(() => {
                    resolve();
                }, 300);
            })
            await writeMessageToDb('dwqeqwr', message);

            dispatch({
                type: 'SEND_MESSAGE_RECEIVE',
                payload: message
            });
        } catch (err) {
            console.log(err)
        } finally {
            dispatch({
                type: 'SEND_MESSAGE_FINISH',
                payload: null
            });
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
