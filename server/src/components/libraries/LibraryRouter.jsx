import React from 'react'
import { 
    Switch, 
    useRouteMatch } from 'react-router-dom'
import ProtectedRoute from '../routing/ProtectedRoute'
import RecursiveRouter from './LibDetails/RecursiveRouter'
import LibsMain from './LibsMain/LibsMain'

function LibraryRouter() {
    const { url } = useRouteMatch()

    return (
        <Switch>
            <ProtectedRoute 
            exact
            path={url} 
            component={LibsMain} /> 

            <ProtectedRoute 
            path={`${url}/:libId`} 
            component={RecursiveRouter} />
        </Switch>    
   
    )
}

export default LibraryRouter
