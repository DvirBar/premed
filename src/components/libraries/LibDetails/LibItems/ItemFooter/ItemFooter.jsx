import React from 'react'
import Votes from '../Votes/Votes'

function ItemFooter({ libId, item }) {
    return (
        <div className="item-footer">
            <Votes 
            libId={libId}
            item={item} />
        </div>
    )
}

export default ItemFooter
