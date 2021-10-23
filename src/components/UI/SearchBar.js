import React, {useEffect, useState, useMemo} from "react";
import {connect, useSelector} from "react-redux";
import debounce from 'lodash.debounce';

// Material components
import {Input, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SvgIcon from "@mui/material/SvgIcon";

// Stylesheets
import styles from '../../styles/SearchBar.Module.css';

// Actions
import usersActions from "../../actions/usersActions";

const SearchBar = props => {
    const {setUsers, fetchUsers} = props;

    const [inputValue, setInputValue] = useState('');
    const [inputDebounce, setInputDebounce] = useState('');

    const dbUsers = useSelector(store => store.users.dbUsers);

    const memoizedFetchUsers = useMemo(() => {
        return debounce(fetchUsers, 500)
    }, [fetchUsers]);

    useEffect(() => {
        (async function() {
            await memoizedFetchUsers();
            setInputDebounce(inputValue);
        })();
    }, [inputValue, memoizedFetchUsers])

    useEffect(() => {
        const userList = dbUsers.filter(u => u && u?.username.startsWith(inputValue));
        setUsers(userList);
    }, [inputDebounce, dbUsers, setUsers])

    return (
        <header>
            <Input
                className={styles.input}
                disableUnderline={true}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search..."
                id="input-search"
                value={inputValue}
                endAdornment={
                    <InputAdornment position="start">
                        <SvgIcon component={SearchIcon} style={{fill: 'white'}}/>
                    </InputAdornment>
                }
            />
        </header>
    );
}
export default connect(
    null,
    {
        setUsers: usersActions.updateUsers,
        fetchUsers: usersActions.fetchUsers
    }
)(SearchBar);
