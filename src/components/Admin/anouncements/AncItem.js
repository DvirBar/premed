import React, { useState } from 'react';
import moment from 'moment';

function AncItem(props) {
    const anc = props.anc;
    const [show, setShow] = useState(false);

    return (
        <div 
        className="anc-item"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}>
            <p className="anc-title">
                <h4>{anc.title}</h4>
                {show && 
                    <i className="material-icons">more_vert</i>
                }
            </p>
            <p className="anc-date">{moment(anc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")}</p>
            <p className="anc-content">{anc.content}</p>
        </div>
    )
}

export default AncItem
