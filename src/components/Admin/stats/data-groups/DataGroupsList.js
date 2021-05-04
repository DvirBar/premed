import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DataGroupItem from './DataGroupItem';

function DataGroupsList({ groups }) {
    return (
        <Fragment>
            {groups.map(group => 
                <DataGroupItem 
                key={group._id}
                group={group} />  
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
