import React from 'react';
import { useParams } from 'react-router-dom';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
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

            :   <ContentContainer>
                    <Thresholds
                    pathId={pathId}
                    tableId={tableId} />
                </ContentContainer>   
            }
        </div>
    )
}

export default StatsContent
