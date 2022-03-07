import React from 'react'
import ChoosePaths from '../TopBar/ChoosePaths/ChoosePaths'
import DisplayInTable from '../TopBar/DisplayInTable/DisplayInTable'

function ChooseBaseDataForm({
    handleSubmit,
    values,
    handleChange,
    changeEnabled,
    isSubmitEnabled
}) {
  return (
    <form 
    className="choose-base-data__form"
    onSubmit={handleSubmit} 
    noValidate>
        <div className="choose-base-data__form__options">
            <ChoosePaths 
            name="pathIds"
            selPaths={values.pathIds}
            onChange={handleChange} />

            <DisplayInTable 
            value={values.enabled}
            onChange={changeEnabled} />
        </div>
        <button 
        disabled={!isSubmitEnabled}
        type="submit">
            סיום
        </button>
    </form>
  )
}

export default ChooseBaseDataForm
