import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUnisFields } from '../../../../redux/selectors/unis';

export default function CalcsBlock({ calcs, disabledCalcs }) {
    const fieldUnis = useSelector(state => 
        getUnisFields(state.unis.unis, calcs))

    return (
        <div className="calculator-calcs-list">
            {fieldUnis.map(uni => 
                <div 
                key={uni._id}
                className="calc-uni-item">
                    <span className="uni-name">
                        {uni.name}
                    </span>
                </div>
            )}
        </div>
    )
}

CalcsBlock.propTypes = {
    calcs: PropTypes.array.isRequired
}
