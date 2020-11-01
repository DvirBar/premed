import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUnisFields } from '../../../../redux/selectors/unis';
import FieldItem from './FieldItem';
import FieldsList from './FieldsList';

export default function CalcsBlock({ calcs, disabledCalcs }) {
    console.log(disabledCalcs);
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
                    <FieldsList
                    fields={calcs.filter(calc => 
                        calc.university === uni._id)}
                    disabledArr={disabledCalcs} />
                </div>
            )}
        </div>
    )
}

CalcsBlock.propTypes = {
    calcs: PropTypes.array.isRequired
}
