import React, { useEffect, useState } from 'react'
import DataTables from './DataTables';
import Stats from './Stats';

function StatsMain() {
    const [showStats, setShowStats] = useState(true);
    useEffect(() => {
        
    })

    return (
        <div className="stats-main">
            <p className="tabs">
                <span 
                className="tab-item"
                onClick={() => setShowStats(true)}>נתונים</span>
                <span 
                className="tab-item"
                onClick={() => setShowStats(false)}>טבלאות</span>
            </p>
            {showStats 
            ? <Stats />
            : <DataTables />}
            
        </div>
    )
}

export default StatsMain
