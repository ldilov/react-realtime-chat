export const updateUsers = (users) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USERS',
            payload: users
        });
    };
};
