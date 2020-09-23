import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../common/Dropdown';

function NestedArg({ arg, fields, assignOption }) {
    const [fieldOptions, setFieldOptions] = useState([])


    useEffect(() => {
        setFieldOptions(fields?.map(field => ({
            name: field.name,
            value: field._id,
            type: 'field',
            role: field.role,
            forbidden: field.role ? true : false
        })))
    }, [fields])
    
    const findRoleBind = (arg, options) => {
        const defOption = options.find(option => 
            option.role === arg.role)
        return defOption
    }

    return (
        <div className={findRoleBind(arg, fieldOptions)
            ? "role-block"
            : "role-block not-assigned"}>
                <span>{arg.name}</span>
             <Dropdown
            key={arg.role}
            options={fieldOptions}
            defaultOption={findRoleBind(arg, fieldOptions)}
            name="calcFieldsIds"
            title="שדה נתונים"
            onChange={assignOption}
            placeholder={{name: "בחירה"}}
            uniqueListKey={arg.role} />
        </div>
    )
}

export default NestedArg
