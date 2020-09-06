import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataFieldItem from './DataFieldItem';
import DataGroupItem from './DataGroupItem';

function DataFieldsList({ fields, groups, types }) {
    const groupFields = fields.filter(field => field.group)

    if(fields.length === 0 && groups.length === 0)
        return <p className="no-resource-error">
                אין שדות וקבוצות נתונים במסלול זה
            </p>

    return (
        <div className="data-fields-admin">
            {fields.map(field => 
                !field.group &&
                    <DataFieldItem 
                    key={field._id}
                    field={field}
                    types={types} /> 
            )}
            {groups.map(group => 
                !group.parent &&
                    <DataGroupItem 
                    key={group._id}
                    group={group}
                    groups={groups}
                    fields={groupFields}
                    types={types} />    
            )}        
        </div>
    )
}

export default DataFieldsList
