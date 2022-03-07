import React, { useState } from 'react'
import useForm from '../../../../../forms/useForm';
import { newUserTable } from '../../../../../redux/actions/userdata';
import ChooseBaseDataForm from '../../ChooseBaseData/ChooseBaseDataForm';

function AddNewEmptyTable({ tableId }) {
    const [defaultValues] = useState({
        pathIds: []
    })

    const {
        handleChange,
        handleSubmit,
        values,
    } = useForm(newUserTable, defaultValues, tableId)

    const changeEnabled = value => {
        handleChange({
            name: "enabled",
            value
        })
    }

    const isSubmitEnabled = 
        typeof values.enabled !== 'undefined' 
        && values.pathIds.length > 0

    return (
        <div>
            <div>בחרו את המסלול אליו אתם מתמיינים, והאם תרצו שהנתונים שלכם יוצגו בטבלה (אנונימית כמובן).</div>
            <ChooseBaseDataForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            changeEnabled={changeEnabled}
            isSubmitEnabled={isSubmitEnabled} />
        </div>
    )
}

export default AddNewEmptyTable;
