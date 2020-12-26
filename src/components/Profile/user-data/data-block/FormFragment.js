import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import CalcBlock from './calc-block/CalcBlock'
import MatchFormFragment from '../MatchFormFragment'
import { GroupsContext } from './GroupsContext'

function FormFragment({ field, isCalc, group }) {
    const {
        getFieldVal
    } = useContext(GroupsContext)

    const dataVal = useSelector(
        getFieldVal(field._id, group?._id))

    return (
        <div className="form-fragment">
            <MatchFormFragment
            field={field}
            groupId={group?._id}
            isCalc={isCalc}
            fieldType={field.fieldType.value}
            defValue={dataVal?.value}
            disabled={isCalc && field.isSuggetion}
            cusGroupParent={group?.cusGroupParent} />

            {isCalc &&
                <CalcBlock
                calc={field}
                value={dataVal?.suggestValue}
                suggestedAccepted={dataVal?.suggestedAccepted} />
            }
        </div>
    )
}

export default FormFragment
