import React from "react";

import styles from '../../styles/SideBar.Module.css';
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";

const SideBar = props => {
    return (
        <div className={styles.aside}>
            <SearchBar />
            <ul className={styles.sideUl}>
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
            </ul>
        </div>
    );
}

export default SideBar;
