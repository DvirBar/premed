import React, { useContext, useState } from 'react';
import AncOptions from './AncOptions';
import moment from 'moment';
import { ViewAncsContext } from '../../ViewAncsContext';
import AncDetails from '../../../AncDetails/AncDetails';

function AncItem({ anc }) {
    const dateText = moment(anc.date)
        .format("פורסם ביום dddd ה-D בMMMM, YYYY")

    const {
        isAdmin
    } = useContext(ViewAncsContext)

    const [displayDetails, setDisplayDetails] = useState(false)

    return (
        <div className="anc-item">
            <div className="anc-item__title">
                <p 
                onClick={() => setDisplayDetails(true)}
                className="anc-item__title__text">
                    {anc.title}
                </p>
                <p 
                className="anc-item__title__date">
                    {dateText}
                </p>
            </div>
            <div className="anc-item__group">
                {anc.group.name}
            </div>
            {isAdmin &&
                <AncOptions anc={anc} />
            }

            <AncDetails
            display={displayDetails}
            toggleDisplay={setDisplayDetails}
            anc={anc} />
        </div>
    )
}

export default AncItem
