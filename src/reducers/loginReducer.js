const loginState = {
    isSingInInProgress: false,
    errors: [],
    isSuccess: false
}

const signupReducer = (state = loginState, action) => {
    switch (action.type) {
        case 'SIGNIN_START':
            return {
                ...state,
                isSignUpInProgress: true,
            }
        case 'SIGNIN_FINISH':
            return {
                ...state,
                isSignUpInProgress: false,
                errors: action.payload.errors,
                isSuccess: action.payload.isSuccess
            }
        case 'SIGNIN_SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        case 'SIGNIN_SET_IS_SUCCESS':
            return {
                ...state,
                isSuccess: action.payload
            }
        default:
            return state;
    }
};

export default signupReducer;
