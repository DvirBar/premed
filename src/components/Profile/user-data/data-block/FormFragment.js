import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import CalcBlock from './calc-block/CalcBlock.jsx'
import MatchFormFragment from '../MatchFormFragment'
import { GroupsContext } from './GroupsContext'

function FormFragment({ field, isCalc, group }) {
    const {
        getFieldVal,
        isSimulated
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

            {isCalc && !isSimulated &&
                <CalcBlock
                calc={field}
                value={dataVal?.value}
                suggestedValue={dataVal?.suggestValue}
                payload={dataVal?.payload} />
            }
        </div>
    )
}

export default FormFragment
