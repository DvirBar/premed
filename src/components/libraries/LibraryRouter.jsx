import React from 'react'
import { 
    BrowserRouter as Router,
    Switch, 
    useRouteMatch } from 'react-router-dom'
import ProtectedRoute from '../routing/ProtectedRoute'
import LibDetails from './LibDetails/LibDetails'
import RecursiveRouter from './LibDetails/RecursiveRouter'
import LibsMain from './LibsMain/LibsMain'

function LibraryRouter() {
    const { url } = useRouteMatch()

    return (
        <Router>
            <Switch>
                <ProtectedRoute 
                exact
                path={url} 
                component={LibsMain} /> 
                    
                <ProtectedRoute 
                path={`${url}/:libId`} 
                component={RecursiveRouter} />
            </Switch>    
        </Router>
    )
}

export default LibraryRouter
