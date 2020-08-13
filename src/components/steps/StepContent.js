import React from 'react';
import PropTypes from 'prop-types';

function StepContent({ selStep }) {
    return (
        <div className="step-content">
            <h1 className="step-title">{selStep.name}</h1>
            {selStep.content 
            ?
                <div className="content-container">
                    {selStep.content}
                </div>
            : 
            <div className="no-resource-error">
                עדיין אין תוכן
            </div>
            }
        </div>
    )
}

StepContent.propTypes = {
    selStep: PropTypes.object.isRequired
}

export default StepContent
