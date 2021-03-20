import React from 'react'
import LibItem from './LibCardItem/LibCardItem'

function LibsList({ libs, noItems }) {
    return (
        <div className="libs-list-wrapper">
            <div className={`libs-list 
            ${noItems ? 'no-items' : 'has-item'}`}>
                {libs.map(lib =>
                    <LibItem
                    key={lib._id}
                    lib={lib}
                    noItems={noItems} />
                )}
            </div>
        </div>
    )
}

export default LibsList
