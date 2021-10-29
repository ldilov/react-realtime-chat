import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import messagesReducer from "./messagesReducer";
import inputFormReducer from "./inputFormReducer";
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer,
    inputForm: inputFormReducer,
    signupForm: signupReducer,
    loginForm: loginReducer
});
