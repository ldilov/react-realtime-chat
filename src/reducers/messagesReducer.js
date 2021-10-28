const messagesState = {
  messages: [],
  selectedMessages: [],
  isSendingInProgress: false
};

const messagesReducer = (state = messagesState, action) => {
    switch(action.type) {
        case 'FETCH_MESSAGES': {
            let messagesPayload = action.payload;
            let result = Object.entries(messagesPayload).map(
                msg => {
                    let payload = msg[1];
                    return {
                        id: msg[0],
                        ...payload
                    }
                }
            );

            return {
                ...state,
                messages: result,
            }
        }
        case 'SELECT_MESSAGES':
            return {
                ...state,
                selectedMessages: [...action.payload],
            };
        case 'DESELECT_MESSAGES':
            return {
                ...state,
                selectedMessages: [],
            };
        case 'SEND_MESSAGE_START':
            return {
                ...state,
                isSendingInProgress: true
            };
        case 'SEND_MESSAGE_RECEIVE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'SEND_MESSAGE_FINISH':
            return {
                ...state,
                isSendingInProgress: false
            };
        default:
            return state;
    }
};

export default messagesReducer;
