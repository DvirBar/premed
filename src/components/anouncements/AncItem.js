import React, { Fragment, useState } from 'react';
import moment from 'moment';

function AncItem({ anc, selectAnc }) {
    
    return (
        <Fragment>
            <div 
            className="anc-item"
            onClick={() => selectAnc(anc)}>
                <span className="anc-date">
                    {moment(anc.date).format("D בMMMM")}
                </span>
                <div className="anc-title">
                    {anc.title}
                </div>
            </div>   
        </Fragment>
    )
}

export default AncItem;
