import React from 'react'
import SlaveBlock from './SlaveBlock'

function SlavesList({ slaves }) {
    return (
        <div className="slaves-list">
            {slaves.map(slave => 
                slave.slaves &&
                <SlaveBlock 
                key={slave._id} 
                parentSlave={slave}
                slaves={slaves} />
            )}
        </div>
    )
}

export default SlavesList
