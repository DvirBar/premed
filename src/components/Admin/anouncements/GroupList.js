import React from 'react';
import PropTypes from 'prop-types';
import PathGroupItem from './PathGroupItem';

function GroupList({ paths, groups }) {
    return (
        <div>
            <ul className="paths-groups-list"> 
            <PathGroupItem
            path={{name: "כללי"}} 
            groups={groups.filter(group => !group.path)} 
            />
            
            {paths.map(path => (
                <PathGroupItem
                key={path._id} 
                path={path} 
                groups={groups.filter(group => 
                    group.path === path._id)} />
            ))}
            </ul>
        </div>
    )
}

GroupList.propTypes = {
    paths: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    loadPaths: PropTypes.bool.isRequired,
    loadGroups: PropTypes.bool.isRequired
}



export default GroupList;









// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGroup, getSubs} from '../../../redux/actions/ancgroups';

// function GroupList() {
//     const dispatch = useDispatch();
//     const [paths, setPaths] = useState([]);
//     const [groups, setGroups] = useState([]);
//     const [subs, setSubs] = useState([])

//     const selPaths = useSelector(state => state.paths);
//     const selGroups = useSelector(state => state.paths);

//     const loadPaths = selPaths.loading;
//     const fetchedPaths = selPaths.paths;
//     const loadGroups = selGroups.loading;
//     const fetchedGroups = selGroups.groups;
//     const fetchedSubs = selGroups.userSubscriptions;

//     useEffect(() => {
//         setPaths(fetchedPaths);
//         setGroups(fetchedGroups);
//         setSubs(fetchedSubs);
//     }, [fetchedPaths, fetchedGroups, fetchedSubs])

//     return (
//         <div className="ancgrous-list">
//             {paths.map(path => (
//                 <ul className="path-list">
//                     <Path 
//                     key={path.id} 
//                     path={path} 
//                     groups={groups.map(group => group.path === path._id && group)} 
//                     subs={subs.map(sub => 
//                         groups.map(group => 
//                         (group._id === sub && group.path === path._id) && sub))} />
//                 </ul>
//             ))}
//         </div>
//     )
// }

// export default GroupList
