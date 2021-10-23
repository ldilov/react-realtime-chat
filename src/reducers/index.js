import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import messagesReducer from "./messagesReducer";
import inputFormReducer from "./inputFormReducer";

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer,
    inputForm: inputFormReducer
});
