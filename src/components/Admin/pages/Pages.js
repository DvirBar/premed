import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddPage from './AddPage';
import Loadbar from '../../layout/Loadbar';
import PathsSelect from './PathsSelect';
import PagesList from './PagesList';

function Pages() {
    const loading =  useSelector(state => state.pages.loading)
    const paths = useSelector(state => state.paths.paths)

    const [selPaths, setSelPaths] = useState([]);
    
    const selectPaths = paths => {
        setSelPaths(paths)
    }

    if(loading)
        return <Loadbar />
        
    return (
        <div className="pages-admin">
            <PathsSelect 
            paths={paths}
            selPaths={selPaths}
            selectPaths={selectPaths} />
            <AddPage paths={paths} />
            <PagesList selPaths={selPaths} />
        </div>
    )
}

export default Pages
