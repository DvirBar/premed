import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { getLibById } from '../../../redux/libraries/selectors'
import LibDetails from './LibDetails'

function RecursiveRouter() {
    let { libId } = useParams()
    let { url } = useRouteMatch()

    const lib = useSelector(getLibById(libId))

    
    return (
        <Switch>
            <Route exact path={url}>
                <LibDetails 
                lib={lib}/>
            </Route>
            <Route 
            path={`${url}/:libId`}
            component={RecursiveRouter} />
        </Switch>
    )
}

export default RecursiveRouter
