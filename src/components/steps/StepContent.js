import React from 'react';
import PropTypes from 'prop-types';

function StepContent({ selStep }) {
    return (
        <div className="step-content">
            <span className="step-title">{selStep.name}</span>
            {selStep.content 
            ?
                <div 
                className="content-container ck-editor"
                dangerouslySetInnerHTML={{__html: selStep.content}}>
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
