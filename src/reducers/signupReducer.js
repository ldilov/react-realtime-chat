const signupState = {
    isSignUpInProgress: false,
    errors: [],
    isSuccess: false
}

const signupReducer = (state = signupState, action) => {
    switch (action.type) {
        case 'SIGNUP_START':
            return {
                ...state,
                isSignUpInProgress: true,
            }
        case 'SIGNUP_FINISH':
            return {
                ...state,
                isSignUpInProgress: false,
                errors: action.payload.errors,
                isSuccess: action.payload.isSuccess
            }
        case 'SIGNUP_SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        case 'SIGNUP_SET_IS_SUCCESS':
            return {
                ...state,
                isSuccess: action.payload
            }
        default:
            return state;
    }
};

export default signupReducer;
