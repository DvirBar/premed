import React from 'react'
import FieldHeaders from './FieldHeaders'
import UniHeaders from './UniHeaders'

function TableHeaders({ tableSections, matchColor, ordering }) {
    return (
        <thead>
            <UniHeaders
            tableSections={tableSections} 
            matchColor={matchColor} />
            <FieldHeaders
            tableSections={tableSections} 
            matchColor={matchColor}
            ordering={ordering} />
        </thead>
    )
}

export default TableHeaders
