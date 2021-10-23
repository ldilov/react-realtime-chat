const users = {
    displayUsers: [],
    dbUsers: []
}

const userReducer = (state = users, action) => {
    switch(action.type) {
        case 'UPDATE_USERS':
            return {
                displayUsers: action.payload.filter(u => u),
                dbUsers: [...state.dbUsers]
            }
        case 'FETCH_USERS':
            return {
                dbUsers: action.payload.filter(u => u),
                displayUsers: [...state.displayUsers]
            };
        default:
            return state;
    }
};

export default userReducer;
