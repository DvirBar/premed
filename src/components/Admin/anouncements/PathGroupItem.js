import React, { Fragment, useState } from 'react'
import GroupItem from './GroupItem';
import AddGroup from './AddGroup';

function PathGroupItem(props) {
    const path = props.path;
    const groups = props.groups;
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    return (
        <Fragment>
            <li className="path-item" > 
                <p className="path-name"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                    <span>{path.name}</span>
                    { show &&
                        <i 
                        className="material-icons"
                        onClick={() => setShowAdd(true)}>add</i>
                    }
                </p>
                <ul className="group-list">
                    {groups.map(group => <GroupItem key={group._id} group={group} pathId={path._id} />)}
                    { showAdd &&
                        <AddGroup 
                        pathId={path._id} 
                        display={showAdd} 
                        setDisplay={setShowAdd} /> 
                    }
                </ul>
            </li>
        </Fragment>
    )
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

