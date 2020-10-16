import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './public';
// import PrivateRoute from './private';
import SignUp from '../components/auth/SignUp';
import Login from '../components/auth/Login';


const Routes = () => {
    return (
            <Switch>
                <PublicRoute restricted={false} path='/signup' component={SignUp} exact />
                <PublicRoute restricted={false} path='/login' component={Login} exact />
            </Switch>
    );
}

export default Routes;