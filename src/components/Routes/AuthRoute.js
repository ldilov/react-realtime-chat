import React from "react";
import {Redirect, Route } from 'react-router-dom'

// Hooks
import useAuth from '../../hooks/useAuth'

const AuthRoute = ({component: Component, ...rest}) => {
    const [ authenticated] = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated !== null && authenticated !== undefined ? <Component /> : <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        />
    );
}

export default AuthRoute;
