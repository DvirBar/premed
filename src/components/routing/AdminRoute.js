import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth)

    return (
        <Route {...rest} render = {props => {
            if(auth.isAuthenticated) {
                if(auth.user.isAdmin)
                    return <Component {...rest} {...props} />;
            }
            else 
                return <Redirect to='/' />;  
        }
        } />
    )
}

export default AdminRoute;