import {loginUser} from "../services/firebase";

const FIREBASE_CODES = {
    WRONG_CREDENTIALS: 'auth/user-not-found'
}

const parseFireBaseErrors = (error) => {
    const errors = [];

    if(error){
        switch(error.code){
            case FIREBASE_CODES.WRONG_CREDENTIALS:
                errors.push("You have provided wrong credentials!");
                break;
        }
    }

    return errors;
}

const validateFormData = (formData) => {
    const errors = [];
    const email = formData[0].value;
    const password = formData[1].value;

    if(!email || !password){
        errors.push("Login credentials can not be empty!")
    }

    if(!/^\S+@\S+\.\S+$/.test(email)){
        errors.push("You have entered invalid email address!")
    }

    return errors;
}

const setErrors = (errors) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNIN_SET_ERRORS',
            payload: errors
        });
    }
}

const setIsSuccess = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNIN_SET_IS_SUCCESS',
            payload: val
        });
    }
}

const setSuccesses = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNIN_SET_SUCCESSES',
            payload: val
        });
    }
}

const loginUserAccount= (formData) => {
    const form = formData.current;
    return async (dispatch) => {
        dispatch({
            type: 'SIGNIN_START',
            payload: null
        });

        const dispatchResult = (isSuccess, validationErrors, firebaseErrors) => {
            const successMessages = [];

            if(isSuccess){
                successMessages.push("You logged in successfully! You will be redirected!");
            }

            dispatch({
                type: 'SIGNIN_FINISH',
                payload: {
                    isSuccess: isSuccess,
                    successes: successMessages,
                    errors: validationErrors.length > 0 ? validationErrors : firebaseErrors
                }
            });
        }
        const validationErrors =  validateFormData(form);

        if(validationErrors.length > 0){
            dispatchResult(false, validationErrors)
        } else {
            loginUser(
                form[0].value,
                form[1].value,
                (isSuccess, err) => dispatchResult(isSuccess, validationErrors, parseFireBaseErrors(err))
            )
        }
    };
};

const moduleData = {
    loginUserAccount,
    setErrors,
    setIsSuccess,
    setSuccesses
};

export default moduleData;
