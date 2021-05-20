import React from 'react'
import { Fragment } from 'react'

function TableCol({ 
    field, 
    matchColor, 
    uni, 
    highlightRow,
    dataItem }) {
    const matchDataItem = (dataItem, field) => {
        const { fieldOptions, fieldType } = field
        const dataVal = dataItem.find(val => 
            val.field === field._id)?.value

        if(fieldOptions && fieldType.value === "select") {
            const optionName = fieldOptions.find(option =>
                option.value === dataVal)?.name

            return optionName || '-'
        }

        return dataVal || '-'
    }


    return (
        <td 
        className={"field-cell"} 
        style={matchColor(uni)}>
            {highlightRow
            ?   <div className="cover"></div>
            :   <Fragment></Fragment>
            }
            <span>
                {matchDataItem(dataItem, field)}
            </span>
        </td>
    )
}

export default TableCol
