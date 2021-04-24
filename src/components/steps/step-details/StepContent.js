import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function StepContent({ step }) {
    return (
        <div className="step-content">
            <span className="step-title">{step.name}</span>
            {step.genContent 
            ?
                <div 
                className="content-container ck-editor"
                dangerouslySetInnerHTML={{__html: step.genContent}}>
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
