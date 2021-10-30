const loginState = {
    isSingInInProgress: false,
    errors: [],
    successes: [],
    isSuccess: false
}

const signupReducer = (state = loginState, action) => {
    switch (action.type) {
        case 'SIGNIN_START':
            return {
                ...state,
                isSingInInProgress: true,
            }
        case 'SIGNIN_FINISH':
            return {
                ...state,
                isSingInInProgress: false,
                errors: action.payload.errors,
                successes: action.payload.successes,
                isSuccess: action.payload.isSuccess
            }
        case 'SIGNIN_SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        case 'SIGNIN_SET_SUCCESSES':
            return {
                ...state,
                successes: action.payload
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
