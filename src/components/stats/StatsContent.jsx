import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import PathStats from './PathStats';
import Thresholds from './thresholds/Thresholds';
import Topbar from './topbar/TopBar';

function StatsContent() {
    const { pathId, tableId, type } = useParams()
    return (
        <div>
            <Topbar />
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
