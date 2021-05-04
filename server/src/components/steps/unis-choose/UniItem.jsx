import React from 'react'
import Checkbox from '../../common/Checkbox'

function UniItem({ uni, selUnis, selectUni }) {
    const isChecked = selUnis.includes(uni._id) ? true : false
    const style = {
        color: uni.color,
        round: true
    }

    return (
        <Checkbox
        name="uniIds"
        label={uni.name}
        value={uni._id}
        onChange={selectUni}
        checked={isChecked}
        isMulti={true}
        style={style} />
    )
}

export default UniItem
