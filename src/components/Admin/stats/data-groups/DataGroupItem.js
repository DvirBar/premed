import React from 'react';
import PropTypes from 'prop-types';
import DataFieldItem from '../data-fields/DataFieldItem';


function DataGroupItem({ group }) {

    return (
            <div className="group-item">
            <div className="group-title">
                <span className="group-name">{group.name}</span>
            </div>

            <div className="group-content">
                {group.fields.length === 0
                ? (
                    <p>
                        אין שדות בקבוצה זו
                    </p>
                )
                : (
                    <div>
                    {group.fields.map(field => 
                        field.group === group._id &&
                            <DataFieldItem
                            key={field._id}
                            field={field} />)}
                    </div>
                )}
            </div>
        </div>
    )}

DataGroupItem.propTypes = {
    group: PropTypes.object.isRequired,
}


export default DataGroupItem
