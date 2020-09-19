import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DataGroupItem from './DataGroupItem';

function DataGroupsList({ groups, groupFields, types }) {
    return (
        // Recursive call to DataGroupItem
        <Fragment>
            {groups.map (group => 
                !group.parent &&
                    <DataGroupItem 
                    key={group._id}
                    group={group}
                    groups={groups}
                    fields={groupFields}
                    types={types} />  
            )}
        </Fragment>
    )
}

DataGroupsList.propTypes = {
    groups: PropTypes.array.isRequired,
    groupFields: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired
}

export default DataGroupsList
