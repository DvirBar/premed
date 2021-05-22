import React, { Fragment, useState } from 'react';
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


    const calcItemStyle = {
        backgroundColor: color + '15',
        color: color
    }

    return (
        <div 
        style={calcItemStyle}
        className="calc-item">
            <p 
            className="calc-name">
                {calc.name}
            </p>
            {calc.constValue 
            ?   <div className="const-calc-value indent-block">
                    ערך קבוע: {calc.constValue}
                </div>
            : <Fragment>
                {typeOptions.length === 0
                ?   <p className="no-thresh-message indent-block">
                        אין סיפי קבלה זמינים
                    </p>
                :   <CalcContent
                    color={color}
                    typeOptions={typeOptions}
                    selType={selType}
                    selectType={selectType}
                    acceptThreshes={acceptThreshes}
                    rejectThreshes={rejectThreshes} />
                }
            </Fragment>
            }
            
        </div>
    )
}

export default CalcItem
