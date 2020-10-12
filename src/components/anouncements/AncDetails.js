import React from 'react';

function AncDetails({anc }) {
    return (
        <div className="anc-details">
            <p className="anc-content">{anc.content}</p>
        </div>
    )
}

export default AncDetails
