import React, { useState } from 'react'
import UniList from './UniList'
import AddUni from './AddUni'

function Unis({ unis, paths }) {

    return (
        <div className="unis">
            <h2 className="uni-title">
                <span>אוניברסיטאות</span>
                <AddUni paths={paths} />
            </h2>
            <UniList
            unis={unis} />
        </div>
    )
}

export default Unis
