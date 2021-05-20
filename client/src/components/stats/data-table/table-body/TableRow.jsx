import React from 'react'
import TableCol from './TableCol'

function TableRow({ 
    index,
    dataItem, 
    matchColor, 
    tableSections, 
    highlightRow, 
    setHighlightRow }) {
    return (
        <tr 
        className={highlightRow === index
            ? "user-data highlight"
            : "user-data"}
        onClick={() => setHighlightRow(index)}>
            {tableSections.map(uni => 
            uni.fields.length === 0
            ? <td 
                className="field-cell" 
                style={matchColor(uni)}>
                    -
                </td>
            
            : uni.fields.map(field =>
                <TableCol 
                field={field}
                dataItem={dataItem}
                matchColor={matchColor}
                uni={uni}
                highlightRow={highlightRow === index} />    
            ))}
        </tr>    
    )
}

export default React.memo(TableRow)
