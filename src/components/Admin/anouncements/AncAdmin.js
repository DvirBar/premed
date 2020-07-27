import React,  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/ancgroups';
import AncList from './AncList';
import AddAnc from './AddAnc';
import ManageGroups from './ManageGroups';

function AncAdmin() {
    const dispatch = useDispatch();
    const [paths, setPaths] = useState([]);
    const [groups, setGroups] = useState([]);
    const [ancs, setAncs] = useState([]);

    useEffect(() => {
        dispatch(getGroups());
    }, [])

    const selPaths = useSelector(state => state.paths);
    const selGroups = useSelector(state => state.ancgroups);
    const selAncs = useSelector(state => state.ancs);

    const loadPaths = selPaths.loading;
    const fetchedPaths = selPaths.paths;
    const loadGroups = selGroups.loading;
    const fetchedGroups = selGroups.groups;
    const loadAncs = selAncs.loading;
    const fetchedAncs = selAncs.ancs;

    useEffect(() => { // Bind selector to local state
        setPaths(fetchedPaths);
        setGroups(fetchedGroups);
        setAncs(fetchedAncs);

    }, [fetchedPaths, fetchedGroups, fetchedAncs])

    if(paths.length === 0)
        return <p>יש להוסיף תחילה מסלולים</p>;

    else if(loadPaths || loadGroups || loadAncs)
        return <p>Loading ...</p>; 

    else {
        return (
        <div className="anc-admin">
                <p className="header">
                <AddAnc 
                ancs={ancs} 
                groups={groups} 
                loadAncs={loadAncs} 
                loadGroups={loadGroups}
                />

                <ManageGroups
                paths={paths}
                groups={groups}
                loadPaths={loadPaths}
                loadGroups={loadGroups}
                />
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
