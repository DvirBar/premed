import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getThreshsByFieldAndType } from '../../../redux/selectors/datatables';
import CalcThreshAxis from './CalcThreshAxis';
import TypeSelector from './TypeSelector';

function CalcItem({ calc, tableId, color }) {
    const acceptThreshes = useSelector(state => 
        getThreshsByFieldAndType(state, tableId, calc._id, 'accept'))

    const rejectThreshes = useSelector(state => 
        getThreshsByFieldAndType(state, tableId, calc._id, 'reject'))

    let typeOptions = []
    if(acceptThreshes.length !== 0) {
        typeOptions.push('accept')
    }

    if(rejectThreshes.length !== 0) {
        typeOptions.push('reject')
    }

    const [selType, setSelType] = useState(typeOptions[0])
    const selectType = type => {
        setSelType(type)
    }

    const nameStyle = {
        color: color
    }

    return (
        <div className="calc-item">
            <p 
            className="calc-name"
            style={nameStyle}>
                {calc.name}
            </p>

            <div className="calc-content">
                <TypeSelector 
                types={typeOptions}
                selType={selType}
                selectType={selectType} />

                {selType === 'accept'
                ?   <CalcThreshAxis
                    threshes={acceptThreshes}
                    type='accept' />

                :   <CalcThreshAxis
                    threshes={rejectThreshes}
                    type='reject' />
                }
            </div>
        </div>
    )
}

export default CalcItem
