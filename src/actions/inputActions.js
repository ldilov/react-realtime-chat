const setInputValue = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_INPUT',
            payload: val
        });
    }
}

const getInputValue = () => {
    return (dispatch) => {
        dispatch({
            type: 'GET_INPUT',
            payload: null
        });
    }
}

export default {
    setInputValue,
    getInputValue
};
