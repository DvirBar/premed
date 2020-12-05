import React from 'react'
import Dropdown from '../../../common/Dropdown'

function ChooseStagedGroup({ groups, chooseGroup }) {
    const options = groups.map(group => ({
        name: group.name,
        value: group._id
    }))

    return (
        <Dropdown
        options={options}
        name="stagedGroup"
        title="מקצועות"
        width='25rem'
        onChange={chooseGroup}
        placeholder="בחירה" />
    )
}

export default ChooseStagedGroup
