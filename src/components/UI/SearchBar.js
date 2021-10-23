import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";

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
    const users = useSelector(store => store.users);

    useEffect(async () => {
        await fetchUsers();
        setInputDebounce(inputValue);
    }, [inputValue])

    useEffect(() => {
        const userList = users.filter(u => u && u?.username.startsWith(inputValue));
        setUsers(userList);
    }, [inputDebounce])

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
