import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getFilteredSortedData } from '../../../../redux/reducers'

function TableBody({ tableSections, matchColor, ordering }) {
    const [highlightRow, setHighlightRow] = useState('')

    const data = useSelector(state => 
        getFilteredSortedData(state.userdata))

    const matchDataItem = (dataItem, field) => {
        const { fieldOptions, fieldType } = field
        const dataVal = dataItem.dataVals.find(val => 
            val.field === field._id)?.value

        if(fieldOptions && fieldType.value === "select") {
            const optionName = fieldOptions.find(option =>
                option.value === dataVal)?.name

            return optionName || '-'
        }

        return dataVal || '-'
    }

    return (
        <tbody>
            {data?.map(dataItem => 
                <tr
                key={dataItem._id} 
                className={highlightRow === dataItem._id 
                    ? "user-data highlight"
                    : "user-data"}
                onClick={() => setHighlightRow(dataItem._id)}>
                    {tableSections.map(uni => 
                    uni.fields.length === 0
                    ? <td 
                        className="field-cell" 
                        style={matchColor(uni)}>
                            -
                        </td>
                    
                    : uni.fields.map(field =>
                            <td 
                            key={field._id}
                            className={ordering.sort.fieldId === field._id 
                                ? "field-cell sorted"
                                : "field-cell"} 
                            style={matchColor(uni)}>
                                {(ordering.sort.fieldId === field._id ||
                                highlightRow === dataItem._id) &&
                                    <div className="cover"></div>
                                }
                                <span>
                                    {matchDataItem(dataItem, field)}
                                </span>
                            </td>
                        ))}
                </tr>    
            )}
        </tbody>
    )
}

export default TableBody
