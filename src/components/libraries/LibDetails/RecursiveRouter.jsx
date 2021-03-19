import React from 'react'
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import LibDetails from './LibDetails'

function RecursiveRouter() {
    let { libId } = useParams()
    let { url } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={url}>
                <LibDetails 
                libId={libId}/>
            </Route>
            <Route 
            path={`${url}/:libId`}
            component={RecursiveRouter} />
        </Switch>
    )
}

export default RecursiveRouter
