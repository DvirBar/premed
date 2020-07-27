import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PathGroupItem from './PathGroupItem';

function GroupList(props) {
    const paths = props.paths;
    const groups = props.groups;
    const loadPaths = props.loadPaths;
    const loadGroups = props.loadGroups;

    if(loadPaths || loadGroups) {
        return <p>Loading ...</p>
    }

    return (
        <div className="ancgroups">
            {paths && groups &&
                <ul className="paths-groups-list">
                {paths.map(path => (
                    <PathGroupItem
                    key={path._id} 
                    path={path} 
                    groups={groups.filter(group => group.path === path._id)} 
                    />
                ))}

                {groups.filter(group => !group.path).length !== 0 && (
                    <PathGroupItem
                    path={ {name: "אחר"} } 
                    groups={groups.filter(group => !group.path)} 
                    />
                )}
                </ul>
            }
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
