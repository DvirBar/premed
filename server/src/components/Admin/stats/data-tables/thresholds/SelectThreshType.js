import React from 'react';
import PropTypes from 'prop-types';

function SelectThreshType({ selType, selectType }) {
    return (
        <ul className="select-thresh-type">
            <li 
            className={selType === 'accept'
            ?   "thresh-type accept selected"
            :   "thresh-type accept"}
            onClick={() => selectType('accept')}>
                קבלה
            </li>
            <li 
            className={selType === 'reject'
            ?   "thresh-type reject selected"
            :   "thresh-type reject"}
            onClick={() => selectType('reject')}>
                דחייה
            </li>
        </ul>
    )
}

SelectThreshType.propTypes = {
    selType: PropTypes.string.isRequired,
    selectType: PropTypes.func.isRequired
}

export default SelectThreshType
