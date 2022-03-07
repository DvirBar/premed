import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import CalcBlock from './calc-block/CalcBlock.jsx'
import MatchFormFragment from '../MatchFormFragment'
import { GroupsContext } from './GroupsContext'
import FieldStatuses from '../../../common/FieldStatuses/FieldStatuses.jsx'
import { isFailure, isLoading, isSuccess } from '../../../../redux/loader/selectors.js'
import { USER_DATA_INSERT } from '../../../../redux/actions/types.js'
import { FAILURE, LOADING, SUCCESS } from '../../../../redux/loader/types.js'
import { selTableSelector } from '../../../../redux/selectors/userdata.js'
import { getTableById } from '../../../../redux/selectors/datatables.js'

function FormFragment({ field, isCalc, group }) {
    const {
        getFieldVal,
        isSimulated
    } = useContext(GroupsContext)
    
    const dataVal = useSelector(
        getFieldVal(field._id, group?._id))
    const loaderIds = [USER_DATA_INSERT, field?._id, group?._id]

    const selTableId = useSelector(selTableSelector);
    const table = useSelector(getTableById(selTableId));
    
    const loading = useSelector(isLoading(...loaderIds))
    const success = useSelector(isSuccess(...loaderIds))
    const failure = useSelector(isFailure(...loaderIds))
    const status = () => {
        if(loading) 
            return LOADING

        if(success)
            return SUCCESS

        if(failure) 
            return FAILURE
    }

    const isDisalbed =  (!table?.enabled && !isSimulated) || (isCalc && field.isSuggetion)

    
    return (
        <div className="form-fragment">
            <MatchFormFragment
            field={field}
            groupId={group?._id}
            isCalc={isCalc}
            fieldType={field.fieldType.value}
            defValue={dataVal?.value}
            disabled={isDisalbed}
            cusGroupParent={group?.cusGroupParent} />
            {!isSimulated &&
                <div className="form-fragment__status">
                    <FieldStatuses status={status()} />
                </div>
            }

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
