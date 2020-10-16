import React from 'react';
import { useRouteMatch, Route, useLocation } from 'react-router-dom';

function TopicsPath() {
    let { url, path } = useRouteMatch()
    let location  = useLocation()
    console.log(url, path)
    return (
        <div>
            
        </div>
    )
}

export default TopicsPath
