import {getUsersFromDb} from "../services/firebase";

const updateUsers = (users) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USERS',
            payload: users
        });
    };
};

const fetchUsers = () => {
    return async (dispatch) => {
        console.log("fetching")
        const usersSnapshot = await getUsersFromDb();
        const users = usersSnapshot
            .val()
            .filter(u => u);

        dispatch({
            type: 'FETCH_USERS',
            payload: users
        })
    }
}

const moduleData = {
    updateUsers,
    fetchUsers
};

export default moduleData;
