import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GroupItem from './GroupItem';
import AddGroup from './AddGroup';

function PathGroupItem({ path, groups }) {
    const [displayAdd, setDisplayAdd] = useState(false);

    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }

    return (
        <Fragment>
            <li className="path-item"> 
                <p className="path-name">
                    <span>{path.name}</span>
                    <i 
                    className="material-icons"
                    onClick={() => toggleAdd(true)}>add</i>
                </p>
                <ul className="group-list">
                    {groups.map(group => 
                        <GroupItem 
                        key={group._id} 
                        propgroup={group} 
                        pathId={path._id} />)}

                    {displayAdd &&
                        <AddGroup 
                        pathId={path._id} 
                        toggleDisplay={toggleAdd} /> 
                    }
                </ul>
            </li>
        </Fragment>
    )
}

PathGroupItem.propTypes = {
    path: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired
}

export default PathGroupItem





// import React, { Fragment } from 'react'

// function PathGroupItem(props) {
//     const path = props.path;
//     const groups = props.groups;
//     const subs = props.subs;
//     const allChecked = true;
//     const found = false

//     for(let i = 0; i < groups.length; i++) {
//         for(let j = 0; j < subs.length; j++) {
//             if(group[i]._id === subs[j]) {
//                 found = true;
//                 break;
//             }
//         }

//         if(!found) {
//             allChecked = false;
//             break;
//         }
//     }

//     return (
//         <Fragment>
//             <li className="path-name">
//                 <span>
//                     <input 
//                     type="checkbox" 
//                     checked={groups.length === subs.length ? true : false} />
//                 </span>
//                 <span>{path.name}</span>
//             </li>
//             <ul className="group-list">
                
//             </ul>
//         </Fragment>
//     )
// }

// export default PathGroupItem

