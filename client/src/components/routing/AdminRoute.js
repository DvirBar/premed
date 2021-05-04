import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoMatchPage from '../layout/NoMatchPage/NoMatchPage';

const AdminRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth)

    return (
        <Route {...rest} render = {props => {
            if(auth.isAuthenticated) {
                if(auth.user.isAdmin)
                    return <Component {...rest} {...props} />;
                
                else 
                    return <Route component={NoMatchPage} />;  
            }
            else 
                return <Route component={NoMatchPage} /> ;  
        }
        } />
    )
}

export default AdminRoute;