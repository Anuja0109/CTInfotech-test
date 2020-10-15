import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { isAuthenticated } from './auth';

function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() && restricted ?
                <Redirect to={{
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                }} />
                :
                <Component {...props} {...rest} />
        )} />
    );
}

export default withRouter(PublicRoute);