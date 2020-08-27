import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth)

    return (
        <Route {...rest} render = {props => {
            if(auth.isAuthenticated) {
                return <Component {...rest} {...props} />;
            } else if(auth.loading) {
                return <p>Loading ...</p>;
            } else {
                return <Redirect to='/login' />;
            }
        }
        } />
    )
}

export default ProtectedRoute;