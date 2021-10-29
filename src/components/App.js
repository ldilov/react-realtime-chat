import React from "react";

import {Route, BrowserRouter as Router} from "react-router-dom";

// Screen components
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import AuthRoute from "./Routes/AuthRoute";
import SignupScreen from "./Screens/SingupScreen";

const App = () => {
    return (
        <Router>
            <AuthRoute exact path="/" component={HomeScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={SignupScreen} />
        </Router>
    );
}


export default App;
