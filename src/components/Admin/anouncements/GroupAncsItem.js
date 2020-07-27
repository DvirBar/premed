import React, { useState } from 'react';
import AncItem from './AncItem';

function GroupAncsItem(props) {
    const group = props.group;
    const ancs = props.ancs;
    const [show, setShow] = useState(false)

    return (
        <div class="group-ancs-list">
            <p className="group-name" 
            onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}>
                <h2>
                    {group.name}
                    { show &&
                    <i className="material-icons more-list"
                    >more_vert</i>
                }
                </h2>
            </p>
            {ancs.map(anc => (
                <AncItem
                key={anc._id}
                anc={anc}
                 />
            ))}
        </div>
    )
}

export default GroupAncsItem
