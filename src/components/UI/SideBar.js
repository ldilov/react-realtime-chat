import React, {useEffect} from "react";

import styles from '../../styles/SideBar.Module.css';
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";
import {connect, useSelector} from "react-redux";
import {refs, setDbListener} from "../../services/firebase";
import {updateUsers} from "../../actions";

const SideBar = props => {
    const {setUsers} = props;
    const users = useSelector(store => store.users.filter(u => u));

    const userItems = users.map(user =>
        <UserItem key={user.username} title={user.username}/>
    );

    useEffect(() => {
        try{
            setDbListener(refs.getUsersRef(), (data) => {
                setUsers(data);
            });
        }catch(err) {
            console.error(err)
        }
    }, []);

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
    setUsers: updateUsers
})(SideBar);
