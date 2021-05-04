import React from 'react';
import PropTypes from 'prop-types';
import DisplayStepUni from './DisplayStepUni';

function StepContent({ step, isFinal }) {
    return (
        <div className="step-content">
            <span className="step-title">
                {step.name} &nbsp;
                {isFinal &&
                    <DisplayStepUni uniId={step?.uniData[0].uni} />
                }
            </span>
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
