const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_USERS':
            return action.payload.filter(u => u)
        case 'FETCH_USERS':
            return action.payload.filter(u => u);
        default:
            return state;
    }
};

export default userReducer;
