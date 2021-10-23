import {writeMessageToDb} from "../services/firebase";

export const updateUsers = (users) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USERS',
            payload: users
        });
    };
};

export const setInputValue = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_INPUT',
            payload: val
        });
    }
}

export const getInputValue = () => {
    return (dispatch) => {
        dispatch({
            type: 'GET_INPUT',
            payload: null
        });
    }
}

export const fetchMessages = (messages) => {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_MESSAGES',
            payload: messages
        });
    };
};

export const sendMessage = (message) => {
    return async (dispatch) => {
        try {
            await writeMessageToDb(0, message);
            dispatch({
                type: 'SEND_MESSAGE',
                payload: message
            });
        } catch (err) {
            console.log(err)
        }
    };
};
