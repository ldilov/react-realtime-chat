const messagesState = {
  messages: [],
  selectedMessages: []
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
                messages: result,
                selectedMessages: state.selectedMessages
            }
        }
        case 'SELECT_MESSAGES':
            return {
                selectedMessages: [...action.payload],
                messages: state.messages
            };
        case 'DESELECT_MESSAGES':
            return {
                selectedMessages: [],
                messages: state.messages
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};

export default messagesReducer;
