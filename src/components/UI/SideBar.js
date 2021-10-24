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
import messagesActions from "../../actions/messagesActions";

const SideBar = props => {
    const {setUsers, selectMessages, deselectMessages, selectUsers, deselectUsers} = props;

    const users = useSelector(store => store.users.displayUsers);
    const selectedUserIds = useSelector(store => store.users.selectedUsers)
        .map(storedUser => storedUser.id);

    const messages = useSelector(store => store.messages.messages);

    const userItems = users.map(user =>
        <UserItem
            id={user.id}
            key={user.username}
            title={user.username}
            name={`${user.firstName} ${user.lastName}`}
            isOnline={user.isOnline}
            isSelected={selectedUserIds.includes(user.id)}
            onClick={() => {
                if(selectedUserIds.includes(user.id)){
                    deselectUsers(users, user.id);
                    deselectMessages();
                } else {
                    selectMessages(messages, user.id);
                    selectUsers(users, user.id);
                }
            }}
        />
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
    fetchUsers: userActions.fetchUsers,
    setUsers: userActions.updateUsers,
    selectUsers: userActions.selectUsers,
    deselectUsers: userActions.deselectUsers,
    selectMessages: messagesActions.selectMessages,
    deselectMessages: messagesActions.deselectMessages
})(SideBar);
