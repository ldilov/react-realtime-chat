const users = {
    displayUsers: [],
    dbUsers: [],
    selectedUsers: [],
    isFetchInProgress: false,
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
        case 'FETCH_IN_PROGRESS':
            return {
                ...state,
                isFetchInProgress: true,
            }
        case 'FETCH_FINISHED':
            return {
                ...state,
                dbUsers: normalizeUserObjects(action.payload),
                isFetchInProgress: false,
            }
        case 'UPDATE_USERS':
            return {
                displayUsers: normalizeUserObjects(action.payload),
                dbUsers: state.dbUsers,
                selectedUsers: state.selectedUsers,
                isFetchInProgress: false
            }
        case 'SELECT_USERS':
            return {
                displayUsers: state.displayUsers,
                dbUsers: state.dbUsers,
                selectedUsers: [...action.payload.filter(u => u)],
                isFetchInProgress: false
            }
        case 'DESELECT_USERS':
            return {
                displayUsers: state.displayUsers,
                dbUsers: state.dbUsers,
                selectedUsers: [...state.selectedUsers.filter(u => !action.payload.includes(u))],
                isFetchInProgress: false
            }
        default:
            return state;
    }
};

export default userReducer;
