import React,  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/ancgroups';
import Loadbar from '../../layout/Loadbar';
import AncList from './AncList';
import AddAnc from './AddAnc';
import ManageGroups from './ManageGroups';

function AncAdmin() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups());
    }, [])

    const selPaths = useSelector(state => state.paths);
    const selGroups = useSelector(state => state.ancgroups);
    const selAncs = useSelector(state => state.ancs);

    const loadPaths = selPaths.loading;
    const paths = selPaths.paths;
    const loadGroups = selGroups.loading;
    const groups = selGroups.groups;
    const loadAncs = selAncs.loading;
    const ancs = selAncs.ancs;

    
    if(loadPaths || loadGroups || loadAncs)
        return <Loadbar />

    else if(paths.length === 0)
        return <p className="no-resource-error">יש להוסיף תחילה מסלולים</p>;

    else {
        return (
            <div className="anc-admin">
                <p className="header">
                <AddAnc 
                ancs={ancs} 
                groups={groups} />

                <ManageGroups
                paths={paths}
                groups={groups} />
            </p>
            
            <AncList 
            ancs={ancs} 
            groups={groups}
            loadAncs={loadAncs}
            loadGroups={loadGroups} />
        </div>
        )
    }
}

export default AncAdmin
