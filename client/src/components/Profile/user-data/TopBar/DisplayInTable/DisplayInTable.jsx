import React from 'react'
import ToggleSwitch from '../../../../common/ToggleSwitch'

function DisplayInTable({ value, onChange }) {
    const options = [
        {
            name: 'אל תציג',
            value: false
        },
        {
            name: 'הצג',
            value: true,
        },
    ]


    return (
        <div className="display-in-table">
            <p className="display-in-table__title">
                הצגה בטבלה:
            </p>

            <ToggleSwitch
            options={options}
            onChange={onChange}
            value={value} />
        </div>
    )
}

export default DisplayInTable
