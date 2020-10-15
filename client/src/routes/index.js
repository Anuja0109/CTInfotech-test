import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PublicRoute from './public';
// import PrivateRoute from './private';
import Landing from '../components/layout/Landing';
import SignUp from '../components/auth/SignUp';
import Login from '../components/auth/Login';


const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={false} path='/' component={Landing} exact />
                <PublicRoute restricted={false} path='/signup' component={SignUp} exact />
                <PublicRoute restricted={false} path='/login' component={Login} exact />
            </Switch>
        </Router>
    );
}

export default Routes;