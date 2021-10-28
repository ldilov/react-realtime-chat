import React, {useCallback, useEffect} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/SideBar.Module.css';

// Custom components
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";

// Services
import {refs, setDbListener} from "../../services/firebase";

// Material UI Components
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

// Actions
import userActions from "../../actions/usersActions";
import messagesActions from "../../actions/messagesActions";

const SideBar = props => {
    const {setUsers, selectMessages, deselectMessages, selectUsers, deselectUsers} = props;

    const isFetchInProgress = useSelector(store => store.users.isFetchInProgress);
    const users = useSelector(store => store.users.displayUsers);
    const selectedUsers = useSelector(store => store.users.selectedUsers);
    const selectedUserIds = selectedUsers.map(storedUser => storedUser.id);

    const messages = useSelector(store => store.messages.messages);

    const userItemCallback = useCallback((userId) => {
            if (selectedUserIds.includes(userId)) {
                deselectUsers(users, userId);
                deselectMessages();
            } else {
                selectMessages(messages, userId);
                selectUsers(users, userId);
            }
        },
        [
            users, selectedUserIds, deselectMessages,
            deselectUsers, selectMessages, selectUsers, messages
        ]
    );

    const userItems = users.map(user => {
            if (isFetchInProgress) {
                return (
                    <Box key={user.id} sx={{display: 'flex', alignItems: 'center'}}>
                        <Skeleton variant="circular" sx={{transform: 'scale3d(1.1,1.1,1.1)', margin: 2}}>
                            <Avatar/>
                        </Skeleton>
                        <Skeleton variant="rectangular" width="60%">
                            <div style={{paddingTop: '30%'}}/>
                        </Skeleton>
                    </Box>
                )
            }
            return (
                <UserItem
                    id={user.id}
                    key={user.username}
                    title={user.username}
                    name={`${user.firstName} ${user.lastName}`}
                    isOnline={user.isOnline}
                    isSelected={selectedUserIds.includes(user.id)}
                    onClick={userItemCallback}
                />
            )
        }
    );

    useEffect(() => {
        setDbListener(refs.getUsersRef(), (data) => {
            setUsers(data);
        });
    }, [setUsers]);

    return (
        <div className={styles.aside}>
            <SearchBar/>
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
