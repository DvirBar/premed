import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PathList from './PathList';
import UniList from './UniList';
import Unis from './Unis';

function AdminDefault() {
    const selectedUnis = useSelector(state => state.unis)
    const loadUnis = selectedUnis.loading;
    const unis = selectedUnis.unis;

    const [paths, setPaths] = useState([]);

    const selPaths = useSelector(state => state.paths);
    const loadPaths = selPaths.loading;
    const fetchedPaths = selPaths.paths;
    
    useEffect(() => {
        setPaths(fetchedPaths);
    }, [fetchedPaths])

    if(loadUnis || loadPaths)
        return <p>loading...</p>

    else {
        return (
            <div className="admin-default">
                <p className="admin-title">תמונות נושא</p>
                <div>שינוי תמונת דף הבית</div>
                <PathList paths={paths}/>  
                <Unis 
                unis={unis}
                paths={paths} />
            </div>
        )
    }
}

export default AdminDefault;
