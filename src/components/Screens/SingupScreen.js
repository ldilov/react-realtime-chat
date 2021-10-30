import React, {useCallback, useEffect, useRef} from "react";
import {connect, useSelector} from "react-redux";

// Custom hooks
import useCustomStyles from "../../hooks/useCustomStyles";

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
    const [customStyles] = useCustomStyles();

    const horizontal = "center";
    const vertical = "top";

    const closeErrorsCallback = useCallback(() => {
        clearErrors();
    }, [clearErrors]);

    const closeSuccessCallback = useCallback(() => {
        clearIsSuccess();
    }, [clearIsSuccess]);

    const errors = useSelector(store => store.signupForm.errors);
    const isSuccess = useSelector(store => store.signupForm.isSuccess);
    const isLoading = useSelector(store => store.signupForm.isSignUpInProgress);

    useEffect(() => {
      if(isSuccess){
          setTimeout(() => {
              window.location.href = "/login";
          }, 2000);
      }
    });

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

export default connect(null, {
    createAccount: signupActions.createAccount,
    clearErrors: () => signupActions.setErrors([]),
    clearIsSuccess: () => signupActions.setIsSuccess(false)
})(SignupScreen);
