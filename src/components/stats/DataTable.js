import React, { useState, useEffect } from 'react'
import FieldOptions from './FieldOptions';

function DataTable({ fields, unis, data}) {
    const [tableSections, setTableSections] = useState([]);
    const [displayOrder, setDisplayOrder] = useState(false);
    const [selField, setSelField] = useState('');


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

    const toggleOrder = open => {
        setDisplayOrder(open)
    }

    const openFieldOptions = field => {
        setSelField(field)
        toggleOrder(true)
    } 

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
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
                                style={matchColor(section.uni, true)}
                                onClick={() => openFieldOptions(field)}>
                                    <div>
                                        <span></span>
                                        <span className="field-name">{field.name}</span>
                                        <i className="material-icons">expand_more</i>
                                    </div>
                                </th>
                                ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map(dataItem => 
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
                </tbody>
            </table>

            <FieldOptions
            field={selField}
            display={displayOrder}
            toggleModal={toggleOrder}
            title={"סינון ומיון " + selField.name} />
        </div>
    )
}

export default DataTable
