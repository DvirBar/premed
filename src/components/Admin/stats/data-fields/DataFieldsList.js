import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataFieldItem from './DataFieldItem';


function DataFieldsList({ allFields, selUni, types }) {
    const [fields, setFields] = useState([])

    /* Filter fields to match selected unis and check 
    that it is no a part of group or a calc */
    useEffect(() => {
        console.log(selUni);
        if(selUni) {
            setFields(allFields.filter(field => 
                field.university._id === selUni 
                && !field.group
                && !field.calcOutput
            ))
        }

        else {
            setFields(allFields.filter(field => 
                !field.university
                && !field.group
                && !field.calcOutput
            ))
        }
    }, [selUni, allFields])


    return (
        <Fragment>
            {fields.map(field =>
                <DataFieldItem 
                key={field._id}
                field={field}
                types={types} />)
            } 
        </Fragment>
    )
}

DataFieldsList.propTypes = {
    allFields: PropTypes.array.isRequired,
    selUni: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired
}

export default DataFieldsList
