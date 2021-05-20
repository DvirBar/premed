import React, { useState } from 'react'
import { Fragment } from 'react'
import TableDataLoadMore from './TableDataLoadMore'
import TableRow from './TableRow'

function TableBody({ tableSections, matchColor, data }) {

    const [highlightRow, setHighlightRow] = useState(null)
    
    return (
        <Fragment>
            <tbody>
                {data?.map((dataItem, index) => 
                    <TableRow 
                    key={index}
                    index={index}
                    dataItem={dataItem}
                    matchColor={matchColor}
                    tableSections={tableSections}
                    highlightRow={highlightRow === index ? highlightRow : ''}
                    setHighlightRow={setHighlightRow} />
                )}  
                
            </tbody>
            <TableDataLoadMore />
        </Fragment>
        
    )
}

export default TableBody
