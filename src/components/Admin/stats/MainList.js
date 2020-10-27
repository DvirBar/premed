import React, { useState } from 'react'
import PropTypes from 'prop-types';
import DataFieldsList from './data-fields/DataFieldsList';
import DataGroupsList from './data-groups/DataGroupsList';

function MainList({ fields, groups, types, selUni }) {
    // Get only fields that are calc output to be passed to calc list
    const calcFields = fields.filter(field => field.calcOutput)
    // Get only fileds that are part of a group to be passed to group list
    const groupFields = fields.filter(field => field.group)
    
    if(fields.length === 0 && groups.length === 0)
        return <p className="no-resource-error">
                אין שדות וקבוצות נתונים במסלול זה
            </p>

    return (
        <div className="data-fields-admin">
            <DataFieldsList
            allFields={fields}
            selUni={selUni}
            types={types} />              

            {/* <CalcsList 
            calcs={calcs}
            fields={calcFields}
            selUni={selUni}
            types={types} /> */}
        
            {!selUni &&
                <DataGroupsList
                groups={groups}
                groupFields={groupFields}
                types={types} />
            }
        </div>
    )
}


DataFieldsList.propTypes = {
    fields: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    selUni: PropTypes.string.isRequired,
}


export default MainList
