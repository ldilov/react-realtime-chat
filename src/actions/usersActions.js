import {getUsersFromDb} from "../services/firebase";

const FETCH_THROTTLE = 400;

const updateUsers = (users) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USERS',
            payload: users
        });
    };
};

const selectUsers = (users, uid) => {
    const selectedUsers = users.filter(u => u && u.id === uid)

    return (dispatch) => {
        dispatch({
            type: 'SELECT_USERS',
            payload: selectedUsers
        });
    };
};

const deselectUsers = (users, uid) => {
    const deselectedUsers = users.filter(u => u && u.id === uid)

    return (dispatch) => {
        dispatch({
            type: 'DESELECT_USERS',
            payload: deselectedUsers
        });
    };
};

const fetchUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_IN_PROGRESS',
            payload: null
        });

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, FETCH_THROTTLE)
        })

        const usersSnapshot = await getUsersFromDb();
        const users = usersSnapshot.val();

        dispatch({
            type: 'FETCH_FINISHED',
            payload: users
        });
    }
}

const moduleData = {
    updateUsers,
    fetchUsers,
    selectUsers,
    deselectUsers
};

export default moduleData;
