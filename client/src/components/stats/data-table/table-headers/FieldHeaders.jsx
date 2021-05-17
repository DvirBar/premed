import React, { Fragment, useState } from 'react'
import FieldOptions from '../../FieldOptions';
import FieldOptionsProvider from '../field-options/FieldOptionsContext';

function FieldHeaders({ tableSections, matchColor, ordering }) {
    const [displayOrder, setDisplayOrder] = useState(false);
    const [selField, setSelField] = useState({});

    const toggleOrder = open => {
        setDisplayOrder(open)
    }

    const openFieldOptions = field => {
        setSelField(field)
        toggleOrder(true)
    } 


    return (
        <Fragment>
            <tr className="fields-headers">
                {tableSections.map(uni =>
                    uni.fields.length === 0
                    ?  <th
                    key={uni._id}
                    className="field-header"
                    style={matchColor(uni, true)}>
                        -
                    </th>

                    : uni.fields.map(field =>
                        <th
                        key={field._id}
                        className={ordering.sort.fieldId === field._id
                            ? "field-header sorted"
                            : "field-header"}
                        style={matchColor(uni, true)}
                        onClick={() => openFieldOptions(field)}>
                            <span className="field-name">{field.name}</span>
                            {<i className={ordering.filters.find(filter => 
                                filter.field.id === field._id) 
                                ? "material-icons shown"
                                : "material-icons"}>
                                filter_alt
                            </i>}
                        </th>
                ))}
            </tr>
             <FieldOptionsProvider field={selField}>
                <FieldOptions
                field={selField}
                ordering={ordering}
                display={displayOrder}
                toggleModal={toggleOrder}
                title={"סינון ומיון " + selField.name} />               
            </FieldOptionsProvider>
        </Fragment>
        
    )
}

export default FieldHeaders
