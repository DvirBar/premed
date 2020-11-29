import React from 'react'
import { useSelector } from 'react-redux'
import { getFieldVal } from '../../../../redux/selectors/userdata'
import CalcBlock from '../CalcBlock'
import MatchFormFragment from '../MatchFormFragment'

function FormFragment({ field, isCalc }) {
    const dataVal = useSelector(
        getFieldVal(field._id, field.group))

    return (
        <div className="form-fragment">
            <MatchFormFragment
            field={field}
            isCalc={isCalc}
            fieldType={field.fieldType.value}
            defValue={dataVal?.value}
            disabled={isCalc && field.isSuggetion} />

            {isCalc && field.isSuggetion &&
                <CalcBlock
                field={field}
                defValue={dataVal?.suggestValue} />
            }
        </div>
    )
}

export default FormFragment
