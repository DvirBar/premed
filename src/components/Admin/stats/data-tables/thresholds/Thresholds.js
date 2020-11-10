import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDataFields } from '../../../../../redux/actions/datafields'
import SelectCalcs from './SelectCalcs'
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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDataFields())
    }, [])

    return (
        <div className="thresholds">
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
