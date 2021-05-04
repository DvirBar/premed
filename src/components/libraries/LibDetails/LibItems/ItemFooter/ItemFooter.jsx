import React from 'react'
import ItemComments from './Comments/ItemComments'
import Votes from './Votes/Votes'

function ItemFooter({ libId, item }) {
    return (
        <div className="item-footer">
            <ItemComments 
            item={item} />
            <Votes 
            libId={libId}
            item={item} />
        </div>
    )
}

export default ItemFooter
