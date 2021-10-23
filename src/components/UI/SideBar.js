import React, {useEffect} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/SideBar.Module.css';

// Custom components
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";

// Services
import {refs, setDbListener} from "../../services/firebase";

// Actions
import userActions from "../../actions/usersActions";

const SideBar = props => {
    const {setUsers} = props;
    console.log(setUsers)
    const users = useSelector(store => store.users);

    const userItems = users.map(user =>
        <UserItem key={user.username} title={user.username} isOnline={user.isOnline}/>
    );

    useEffect(() => {
        setDbListener(refs.getUsersRef(), (data) => {
            setUsers(data);
        });
    }, [setUsers]);

    return (
        <div className={styles.aside}>
            <SearchBar />
            <ul className={styles.sideUl}>
                {userItems}
            </ul>
        </div>
    );
}

export default connect(null, {
    setUsers: userActions.updateUsers
})(SideBar);
