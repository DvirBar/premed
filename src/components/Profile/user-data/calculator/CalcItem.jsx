import React from 'react'
import { useSelector } from 'react-redux'
import { getFieldValSimulated } from '../../../../redux/selectors/userdata'
import FormInputBorder from '../../../common/FormInputBorder'

function CalcItem({ calc }) {
    const valueObj = useSelector(getFieldValSimulated(calc._id))
    console.log(valueObj);
    return (
        <FormInputBorder
        label={calc.name}
        type='text'
        name={calc._id}
        value={valueObj && (valueObj.value || valueObj.suggestValue)}
        disabled={true} />
    )
}

export default CalcItem
