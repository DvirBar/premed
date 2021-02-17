import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getThreshsByFieldAndType } from '../../../../redux/selectors/datatables';
import CalcContent from './CalcContent';

function CalcItem({ calc, tableId, color }) {
    const acceptThreshes = useSelector(
        getThreshsByFieldAndType(tableId, calc._id, 'accept'))

    const rejectThreshes = useSelector(
        getThreshsByFieldAndType(tableId, calc._id, 'reject'))

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

    const calcItemStyle = {
        backgroundColor: color + '15'
    }

    return (
        <div 
        style={calcItemStyle}
        className="calc-item">
            <p 
            className="calc-name"
            style={nameStyle}>
                {calc.name}
            </p>

            {typeOptions.length === 0
            ?   <p>אין סיפי קבלה זמינים</p>
            :   <CalcContent
                typeOptions={typeOptions}
                selType={selType}
                selectType={selectType}
                acceptThreshes={acceptThreshes}
                rejectThreshes={rejectThreshes} />
            }

            
        </div>
    )
}

export default CalcItem
