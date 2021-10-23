export default (state = [], action) => {
    switch(action.type) {
        case 'SET_INPUT':
            return action.payload;
        case 'GET_INPUT':
            return state;
        default:
            return '';
    }
};
