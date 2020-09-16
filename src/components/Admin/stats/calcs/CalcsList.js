import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CalcItem from './CalcItem';

function CalcsList({ pathId, calcs, fields, uniId }) {
    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const types = useSelector(state => state.datafields.types)
    const [pathCalcs, setPathCalcs] = useState([])

    useEffect(() => {
        setPathCalcs(calcs.filter(calc => 
            calc.path === pathId && calc.university === uniId))
    }, [pathId, uniId]) 

    if(pathCalcs?.length === 0)
        return <p className="no-resource-error">אין שקלולים במסלול זה</p>
       
    else 
        return (
            <div className="calcs-list">
                {pathCalcs?.map(calc => 
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

export default CalcsList
