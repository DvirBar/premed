import React, { Fragment } from 'react';
import moment from 'moment';

function AncCarItem({ anc, selectAnc }) {
    return (
        <div 
        className="ancs-carousel__item"
        onClick={() => selectAnc(anc)}>
            <span className="anc-date">
                {moment(anc.date).format("D בMMMM")}
            </span>
            <div className="anc-title">
                {anc.title}
            </div>
        </div>   
    )
}

export default AncCarItem;
