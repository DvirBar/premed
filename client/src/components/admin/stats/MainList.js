import React from 'react'
import PropTypes from 'prop-types';
import DataFieldsList from './data-fields/DataFieldsList';
import DataGroupsList from './data-groups/DataGroupsList';

function MainList({ fields, groups, selUni }) {
    if(fields.length === 0 && groups.length === 0)
        return <p className="no-resource-error">
                אין שדות וקבוצות נתונים במסלול זה
            </p>

    return (
        <div className="data-fields-admin">
            <DataFieldsList
            allFields={fields}
            selUni={selUni} />              
        
            {!selUni &&
                <DataGroupsList
                groups={groups} />
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
