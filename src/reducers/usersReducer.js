const users = {
    displayUsers: [],
    dbUsers: [],
    selectedUsers: []
}

const normalizeUserObjects = (data) => {
    return Object.entries(data)
        .map(entry => {
            let userInfo = entry[1];
            return {
                id: entry[0],
                ...userInfo
            }
        });
}

const userReducer = (state = users, action) => {
    switch(action.type) {
        case 'UPDATE_USERS':
            return {
                displayUsers: normalizeUserObjects(action.payload),
                dbUsers: state.dbUsers,
                selectedUsers: state.selectedUsers
            }
        case 'SELECT_USERS':
            return {
                displayUsers: state.displayUsers,
                dbUsers: state.dbUsers,
                selectedUsers: [...action.payload.filter(u => u)]
            }
        case 'DESELECT_USERS':
            return {
                displayUsers: state.displayUsers,
                dbUsers: state.dbUsers,
                selectedUsers: [...state.selectedUsers.filter(u => !action.payload.includes(u))]
            }
        case 'FETCH_USERS':
            return {
                dbUsers: normalizeUserObjects(action.payload),
                displayUsers: state.displayUsers,
                selectedUsers: state.selectedUsers
            };
        default:
            return state;
    }
};

export default userReducer;
