import React, { useState, useEffect } from 'react'

function DataTable({ fields, unis, data}) {
    const [tableSections, setTableSections] = useState([])

    useEffect(() => {
        setTableSections([{
                uni: 'no-path',
                fields: fields.filter(field => !field.university && !field.group)
            },
            ...unis.map(uni => ({ 
                uni: uni,
                fields: fields.filter(field => field.university === uni._id && !field.group)
            })
        )])
    }, [fields, unis])

    const matchColor = (uni, isHeader) => {
        return {
            backgroundColor: uni === 'no-path'
            ? isHeader ? '#486974' : '#48697460'
            : isHeader ? uni.color : uni.color + '60'
        }
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <tr className="uni-headers">
                    {tableSections.map(section => 
                        <th 
                        className="uni-header"
                        colSpan={section.fields.length}>
                            {section.uni === 'no-path' 
                            ?   <span style={matchColor(section.uni, true)}>
                                    כללי
                                </span>

                            :   <span style={matchColor(section.uni, true)}>
                                    {section.uni.name}
                                </span>
                            }
                        </th>
                        )}
                </tr>
                <tr className="fields-headers">
                    {tableSections.map(section =>
                        section.fields.length === 0
                        ?  <th
                        className="field-header"
                        style={matchColor(section.uni, true)}>
                            -
                        </th>

                        : section.fields.map(field =>
                            <th
                            className="field-header"
                            style={matchColor(section.uni, true)}>
                                {field.name}
                            </th>
                            ))}
                </tr>

                {data.map(dataItem => 
                    <tr className="user-data">
                        {tableSections.map(section => 
                        section.fields.length === 0
                        ? <td 
                            className="field-cell" 
                            style={matchColor(section.uni)}>
                                -
                            </td>
                        
                        : section.fields.map(field =>
                                <td 
                                className="field-cell" 
                                style={matchColor(section.uni)}>
                                    {dataItem.dataVals.find(val => 
                                        val.field === field._id)?.value || '-'}
                                </td>
                            ))}
                    </tr>    
                )}
                
            </table>
        </div>
    )
}

export default DataTable
