import React from "react";

import styles from '../../styles/LoginScreen.Module.css';

const LoginScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h2 className={styles.loginH2}>Login</h2>
                <form>
                    <div className={styles.userBox}>
                        <input type="text" name="" required=""/>
                        <label className={styles.label}>Username</label>
                    </div>
                    <div className={styles.userBox}>
                        <input type="password" name="" required=""/>
                        <label className={styles.label}>Password</label>
                    </div>
                    <a href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
