import React, { useState } from 'react';

function GridItem(props) {
    const [item, setItem] = useState(props.item);

    return (
        <div className="grid-item">
            <p className="item-name">{item.name}</p>
            <p className="grid-content">{item.content}</p>
        </div>
    )
}

export default GridItem
