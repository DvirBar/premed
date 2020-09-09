import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataFieldItem from './DataFieldItem';
import DataGroupItem from './DataGroupItem';

function DataFieldsList({ fields, groups, types, selUni }) {
    const groupFields = fields.filter(field => field.group)
    const [uniFields, setUniFields] = useState([])

    useEffect(() => {
        setUniFields(fields.filter(field => 
            field.university === selUni))
    }, [selUni])    
    if(fields.length === 0 && groups.length === 0)
        return <p className="no-resource-error">
                אין שדות וקבוצות נתונים במסלול זה
            </p>

    return (
        <div className="data-fields-admin">
            {!selUni
            ? (
                <Fragment>
                    {fields.map(field => 
                        !field.group && 
                        !field.university && 
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
                </Fragment>    
            )
            : (
                <Fragment>
                    {uniFields.length !== 0
                    ? (
                        <Fragment>
                            {uniFields.map(field =>
                                <DataFieldItem 
                                key={field._id}
                                field={field}
                                types={types} />)
                            } 
                        </Fragment>    
                    )
                    : <p className="no-resource-error">
                        אין שדות וקבוצות לאוניברסיטה זו
                    </p>
                    }
                           
                </Fragment>
            )}
        </div>
    )
}

DataFieldsList.propTypes = {
    fields: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    selUni: PropTypes.string.isRequired
}

export default DataFieldsList
