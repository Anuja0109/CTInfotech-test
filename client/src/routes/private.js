import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { isAuthenticated } from './auth';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() ?
                <Component {...props} {...rest} />
                : <Redirect to={{
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                }} />
        )} />
    );
}

export default withRouter(PrivateRoute);