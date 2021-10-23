const updateUsers = (users) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USERS',
            payload: users
        });
    };
};

export default {
    updateUsers
};
