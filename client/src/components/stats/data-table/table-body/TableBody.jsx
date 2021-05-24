import React, { useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectTableDataFull } from '../../../../redux/stats/userdata/real-data/selectors'
import TableDataLoadMore from './TableDataLoadMore'
import TableRow from './TableRow'

function TableBody({ tableSections, matchColor, data }) {
    const [highlightRow, setHighlightRow] = useState(null)
    const {
        finished
    } = useSelector(selectTableDataFull)

    return (
        <Fragment>
            <tbody className={`${finished ? 'finished' : ''}`}>
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
