import React from 'react';

function AncDetails(props) {
    const anc = props.anc;    

    return (
        <div className="anc-details">
            <p className="anc-title">{anc.title}</p>
            <p className="anc-content">{anc.content}</p>
        </div>
    )
}

export default AncDetails
