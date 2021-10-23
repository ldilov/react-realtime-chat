import React from "react";

import SearchIcon from '@mui/icons-material/Search';
import SvgIcon from "@mui/material/SvgIcon";

import styles from '../../styles/SearchBar.Module.css';
import {Input, InputAdornment} from "@mui/material";

const SearchBar = props => {
    return (
        <header>
            <Input
                className={styles.input}
                disableUnderline={true}
                placeholder="Search..."
                id="input-search"
                endAdornment={
                    <InputAdornment position="start">
                        <SvgIcon component={SearchIcon} style={{fill: 'white'}}/>
                    </InputAdornment>
                }
            />
        </header>
    );
}
export default SearchBar;
