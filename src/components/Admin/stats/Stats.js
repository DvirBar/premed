import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getAllowedTypes } from '../../../redux/actions/datafields';

function Stats() {
    let { url } = useRouteMatch()
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllowedTypes())
    }, [])

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
