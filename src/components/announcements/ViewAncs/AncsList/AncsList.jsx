import React from 'react'
import { useSelector } from 'react-redux'
import { getAllAncs } from '../../../../redux/announcements/ancs/selectors'
import AncItem from './AncItem/AncItem'

function AncsList() {
    const ancs = useSelector(getAllAncs)

    if(ancs.length === 0) {
        return <div className="no-resource-error">
            לא נמצאו פרסומים התואמים את החיפוש
        </div>
    }

    return (
        <div className="ancs-list">
            {ancs.map(anc => 
                <AncItem
                key={anc._id}
                anc={anc} />
            )}
        </div>
    )
}

export default AncsList
