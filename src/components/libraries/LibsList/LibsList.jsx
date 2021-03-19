import React from 'react'
import LibItem from './LibItem'

function LibsList({ libs }) {
    return (
        <div className="libs-list">
            {libs.map(lib =>
                <LibItem
                key={lib._id}
                lib={lib} />
            )}
        </div>
    )
}

export default LibsList
