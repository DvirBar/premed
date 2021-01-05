import React from 'react'

function UniHeaders({ tableSections, matchColor }) {
    return (
        <tr className="uni-headers">
            {tableSections.map(uni => 
                <th 
                className="uni-header"
                colSpan={uni.fields.length}>
                    <span style={matchColor(uni, true)}>
                        {uni.name}
                    </span>
                </th>
                )}
        </tr>
    )
}

export default UniHeaders
