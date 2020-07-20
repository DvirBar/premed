import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PathItem from './PathItem';
import AddPath from './AddPath';

function PathList() {
    const [paths, setPaths] = useState([]);

    const selPaths = useSelector(state => state.paths);
    const loading = selPaths.loading;
    const fetchedPaths = selPaths.paths;
    
    useEffect(() => {
        setPaths(fetchedPaths);
    }, [fetchedPaths])

    return (
        <div>
            <h2>מסלולים</h2>
            <ul className="paths-list">
                {loading && <p>Loading...</p>}
                {paths 
                ? (paths.map(path => (
                    <PathItem key={path.id} path={path} />
                )))
                : <li>אין עדיין מסלולים</li>}
                <AddPath />
            </ul>
        </div>
    )
}

export default PathList
