import React from 'react';
import PropTypes from 'prop-types';
import CalcItem from './CalcItem';

export default function CalcsBlock({ calcs, unis }) {

    return (
        <div className="calculator-calcs-list">
            {unis.map(uni => 
                <div 
                key={uni._id}
                className="calc-uni-item">
                    <span className="uni-name">
                        {uni.name}
                    </span>
                    <div className="uni-calcs-list">
                        {calcs.map(calc => 
                            calc.uni === uni._id &&
                            <CalcItem
                            key={calc._id}
                            calc={calc} />
                        )}                        
                    </div>
                </div>
            )}
        </div>
    )
}

CalcsBlock.propTypes = {
    calcs: PropTypes.array.isRequired
}
