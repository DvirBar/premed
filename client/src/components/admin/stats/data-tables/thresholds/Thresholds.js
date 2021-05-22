import React, { Fragment, useState } from 'react'
import Selectors from './Selectors'
import SelectThreshType from './SelectThreshType'
import ThreshList from './ThreshList'

function Thresholds({ tableId }) {
    const [selField, setSelField] = useState()

    const selectField = field => {
        setSelField(field.value)
    }

    const [selType, setSelType] = useState('accept')

    const selectType = type => {
        setSelType(type)
    }

    return (
        <div className="thresholds-admin">
            <Selectors 
            selectField={selectField} />

            {selField &&
                <Fragment>
                    <SelectThreshType
                    selType={selType}
                    selectType={selectType} /> 

                    <ThreshList 
                    tableId={tableId}
                    selField={selField}
                    threshType={selType} />
                </Fragment>
            }
            
        </div>
    )
}

export default Thresholds
