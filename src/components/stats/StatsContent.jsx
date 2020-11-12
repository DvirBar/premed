import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import PathStats from './PathStats';
import Thresholds from './thresholds/Thresholds';

function StatsContent() {
    const { pathId, tableId, type } = useParams()
    return (
        <div className="stats">
            {type === 'table'
            ?   <PathStats 
                pathId={pathId} 
                tableId={tableId} />

            :   <Thresholds
                pathId={pathId}
                tableId={tableId} />
            }
        </div>
    )
}

export default StatsContent
