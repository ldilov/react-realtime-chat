const messagesReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_MESSAGES':
            return Object.entries(action.payload).map(
                msg => {
                    let payload = msg[1];
                    return {
                        id: msg[0],
                        ...payload
                    }
                }
            );
        case 'SEND_MESSAGE':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default messagesReducer;
