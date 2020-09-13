import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function Stats() {
    let { url } = useRouteMatch()

    return (
        <div className="choose-stats">
            <Link to={`${url}/fields`}>
                שדות נתונים
            </Link>
            <Link to={`${url}/calcs`}>
                שקלולים
            </Link>
        </div>
    )
}

export default Stats
