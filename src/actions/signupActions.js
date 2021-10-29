import {createUser} from "../services/firebase";

const setErrors = (errors) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNUP_SET_ERRORS',
            payload: errors
        });
    }
}

const setIsSuccess = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNUP_SET_IS_SUCCESS',
            payload: val
        });
    }
}

const createAccount = (formData) => {
    const form = formData.current;
    return async (dispatch) => {
        dispatch({
            type: 'SIGNUP_START',
            payload: null
        });

        createUser(
            form[0].value,
            form[1].value,
            form[2].value,
            form[3].value,
            form[4].value,
            (isSuccess, err) => {
                const errors = [];

                if(err){
                    errors.push(err);
                }

                dispatch({
                    type: 'SIGNUP_FINISH',
                    payload: {
                        isSuccess,
                        errors
                    }
                });
            }
        )
    };
};

const moduleData = {
    createAccount,
    setErrors,
    setIsSuccess
};

export default moduleData;
