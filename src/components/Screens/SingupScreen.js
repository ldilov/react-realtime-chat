import React, {useCallback, useRef} from "react";
import {connect, useSelector} from "react-redux";

// Stylesheets
import styles from '../../styles/LoginScreen.Module.css';

// Material UI Components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

// Services
import signupActions from '../../actions/signupActions';


const SNACKBAR_TIMEOUT_SECONDS = 3;

const SignupScreen = (props) => {
    const {createAccount, clearErrors, clearIsSuccess} = props;

    const horizontal = "center";
    const vertical = "top";

    const closeErrorsCallback = useCallback(() => {
        clearErrors();
    }, []);

    const closeSuccessCallback = useCallback(() => {
        clearIsSuccess();
    }, []);

    const errors = useSelector(store => store.signupForm.errors);
    const isSuccess = useSelector(store => store.signupForm.isSuccess);
    const isLoading = useSelector(store => store.signupForm.isSignUpInProgress);

    const formRef = useRef();

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={SNACKBAR_TIMEOUT_SECONDS * 1000}
                open={errors.length > 0}
                onClose={closeErrorsCallback}
                key={vertical + horizontal + "isError"}
            >
                <Alert variant="filled" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errors[0]}
                </Alert>
            </Snackbar>
            <Snackbar
                autoHideDuration={SNACKBAR_TIMEOUT_SECONDS * 1000}
                anchorOrigin={{ vertical, horizontal }}
                open={errors.length === 0 && isSuccess}
                onClose={closeSuccessCallback}
                key={vertical + horizontal + "isSuccess"}
            >
                <Alert variant="filled" severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You created account successfully!
                </Alert>
            </Snackbar>
            <div className={styles.container}>
                <div className={styles.signupBox}>
                    <h2 className={styles.loginH2}>Sign Up</h2>
                    <form ref={formRef}>
                        <div className={styles.userBox}>
                            <input type="text" name="username" required/>
                            <label className={styles.label}>Username</label>
                        </div>
                        <div className={styles.userBox}>
                            <input type="text" name="firstName" required/>
                            <label className={styles.label}>First Name</label>
                        </div>
                        <div className={styles.userBox}>
                            <input type="text" name="lastName" required/>
                            <label className={styles.label}>Last Name</label>
                        </div>
                        <div className={styles.userBox}>
                            <input type="email" name="email" required/>
                            <label className={styles.label}>Email</label>
                        </div>
                        <div className={styles.userBox}>
                            <input type="password" name="password" required/>
                            <label className={styles.label}>Password</label>
                        </div>

                        <LoadingButton
                            sx={customStyles.LoadingButton}
                            onClick={() => createAccount(formRef)}
                            loading={isLoading}
                            variant="outlined"
                            loadingPosition="end"
                            endIcon={<SendIcon />}
                        >
                           Submit
                        </LoadingButton>

                    </form>
                </div>
            </div>
        </>
    );
}

const customStyles = {
    LoadingButton: {
        borderRadius: "10px",
        backgroundColor: "inherit",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "15px 26px",
        fontSize: "16px",
        "&:hover": {
            background: "#03e9f4",
            color: "#141e30",
            borderRadius: "5px",
            boxShadow: "0 0 5px #03e9f4, 0 0 15px #03e9f4, 0 0 2px #03e9f4, 0 0 1px #03e9f4",
        },
        "&:disabled": {
            background: "#03e9f4",
            color: "#141e30",
        }
    }
}

export default connect(null, {
    createAccount: signupActions.createAccount,
    clearErrors: () => signupActions.setErrors([]),
    clearIsSuccess: () => signupActions.setIsSuccess(false)
})(SignupScreen);
