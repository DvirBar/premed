import React from 'react';
import moment from 'moment';

function AncDetails(props) {
    const anc = props.anc;

    return (
        <div className="anc-details">
            <p className="anc-details-date">
                {moment(anc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")}
                </p>
            <p className="anc-content">{anc.content}</p>
        </div>
    )
}

export default AncDetails
