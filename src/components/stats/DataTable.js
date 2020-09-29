import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FieldOptions from './FieldOptions';

function DataTable({ fields, unis, data}) {
    const [tableSections, setTableSections] = useState([]);
    const [displayOrder, setDisplayOrder] = useState(false);
    const [selField, setSelField] = useState({});
    const [highlightRow, setHighlightRow] = useState('')

    const ordering = useSelector(state => state.userdata.ordering);

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
                                className={ordering.sort.fieldId === field._id
                                    ? "field-header sorted"
                                    : "field-header"}
                                style={matchColor(section.uni, true)}
                                onClick={() => openFieldOptions(field)}>
                                    <div>
                                        <span></span>
                                        <span className="field-name">{field.name}</span>
                                        {<i className={ordering.filters.find(filter => 
                                            filter.field.id === field._id) 
                                            ? "material-icons shown"
                                            : "material-icons"}>
                                            filter_alt
                                        </i>}
                                    </div>
                                </th>
                                ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map(dataItem => 
                        <tr
                        key={dataItem._id} 
                        className={highlightRow === dataItem._id 
                            ? "user-data highlight"
                            : "user-data"}
                        onClick={() => setHighlightRow(dataItem._id)}>
                            {tableSections.map(section => 
                            section.fields.length === 0
                            ? <td 
                                className="field-cell" 
                                style={matchColor(section.uni)}>
                                    -
                                </td>
                            
                            : section.fields.map(field =>
                                    <td 
                                    className={ordering.sort.fieldId === field._id 
                                        ? "field-cell sorted"
                                        : "field-cell"} 
                                    style={matchColor(section.uni)}>
                                        {ordering.sort.fieldId === field._id ||
                                        highlightRow === dataItem._id &&
                                            <div className="cover"></div>
                                        }
                                        <span>
                                            {dataItem.dataVals.find(val => 
                                                val.field === field._id)?.value || '-'}
                                        </span>
                                    </td>
                                ))}
                        </tr>    
                    )}
                </tbody>
            </table>

            <FieldOptions
            field={selField}
            ordering={ordering}
            display={displayOrder}
            toggleModal={toggleOrder}
            title={"סינון ומיון " + selField.name} />
        </div>
    )
}

export default DataTable
