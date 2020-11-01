import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import FieldItem from './FieldItem'

function FieldsList({ fields, disabledArr }) {
    const dataVals = useSelector(state => state.userdata.simulatedData);
    return (
        <Fragment>
            {fields.map(field => 
                <FieldItem
                key={field._id}
                field={field}
                defValue={dataVals.find(val =>
                    val.field._id === field._id)?.value}
                disabled={disabledArr?.find(calc =>
                    calc._id === field._id)} />)}
        </Fragment>
    )
}

export default FieldsList
