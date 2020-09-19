import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CalcItem from './CalcItem';

function CalcsList({ calcs, selUni, types }) {
    const [fields, setFields] = useState([])

    const fetchedFields = useSelector(state => 
        state.datafields.fields)

    useEffect(() => {
        let calcFields = fetchedFields.filter(field => 
            field.calcOutput)

        setFields(calcFields)
    }, [fetchedFields])

    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const [uniCalcs, setUniCalcs] = useState([])

    useEffect(() => {
        setUniCalcs(calcs.filter(calc => 
            calc.university === selUni))
    }, [selUni, calcs]) 

    return (
        <div className="calcs-list">
            {uniCalcs?.map(calc => 
                <CalcItem
                key={calc._id}
                calc={calc}
                field={fields.find(field => 
                    field.calcOutput === calc._id)}
                types={types}
                storedCalcs={storedCalcs} />
                )}
        </div>
    )
}

CalcsList.propTypes = {
    calcs: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    selUni: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired
}

export default CalcsList
