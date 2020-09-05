import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataFieldItem from './DataFieldItem';

function DataFieldsList({ pathId, fields, types }) {
    const [selFields, setSelFields] = useState([])

    useEffect(() => {
        let filtFields = fields.filter(field =>
            field.path === pathId)
        setSelFields(filtFields)
    }, [pathId, fields])

    if(fields.length === 0)
        return <p className="no-resource-error">אין שדות נתונים במסלול זה</p>

    return (
        <div className="data-fields-admin">
            {selFields.map(field => 
                <DataFieldItem 
                key={field._id}
                field={field}
                types={types} /> 
            )}        
        </div>
    )
}

export default DataFieldsList
