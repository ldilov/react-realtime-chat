import React, {useCallback, useEffect, useRef} from "react";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

// Stylesheets
import styles from '../../styles/LoginScreen.Module.css';

// Custom hooks
import useCustomStyles from "../../hooks/useCustomStyles";
import useAuth from "../../hooks/useAuth";

// Material UI Components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Actions
import loginActions from "../../actions/loginActions";

const LoginScreen = (props) => {
    const {userLogin, clearErrors, clearIsSuccess} = props;
    const [customStyles] = useCustomStyles();
    const [authData] = useAuth();
    const formRef = useRef();

    useEffect(() => {
        if(authData){
            window.location.href='/';
        }
    }, [authData, props.history])

    const horizontal = "center";
    const vertical = "top";

    const closeErrorsCallback = useCallback(() => {
        clearErrors();
    }, []);

    const closeSuccessCallback = useCallback(() => {
        clearIsSuccess();
    }, []);

    const errors = useSelector(store => store.loginForm.errors);
    const isSuccess = useSelector(store => store.loginForm.isSuccess);
    const isLoading = useSelector(store => store.loginForm.isSignInInProgress);

    if(authData) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" sx={{transform: 'scale3d(1.5,1.5,1.5)'}} />
            </Backdrop>
        );
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                autoHideDuration={2 * 1000}
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
                autoHideDuration={2 * 1000}
                anchorOrigin={{vertical, horizontal}}
                open={errors.length === 0 && isSuccess}
                onClose={closeSuccessCallback}
                key={vertical + horizontal + "isSuccess"}
            >
                <Alert variant="filled" severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You logged in successfully!
                </Alert>
            </Snackbar>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <h2 className={styles.loginH2}>Login</h2>
                    <form ref={formRef}>
                        <div className={styles.userBox}>
                            <input type="email" name="" required/>
                            <label className={styles.label}>Email</label>
                        </div>
                        <div className={styles.userBox}>
                            <input type="password" name="" required/>
                            <label className={styles.label}>Password</label>
                        </div>
                        <LoadingButton
                            sx={customStyles.LoadingButton}
                            onClick={() => userLogin(formRef)}
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

export default connect(null,
    {
        userLogin: loginActions.loginUserAccount,
        clearErrors: () => loginActions.setErrors([]),
        clearIsSuccess: () => loginActions.setIsSuccess(false)
    }
)(withRouter(LoginScreen));