import React from 'react';
import PropTypes from 'prop-types';
import DisplayStepUni from './DisplayStepUni';
import useStepsGlobal from '../hooks/useStepsGlobal';
import { useParams } from 'react-router';
import UniContent from './UniContent';
import { isObjEmpty } from '../../../utils/objects';

function StepContent({ step, isFinal }) {
    const { getUniContent } = useStepsGlobal()

    const uniContent = getUniContent(step)
    const { pathId } = useParams()


    return (
        <div className="step-content">
            <span className="step-title">
                {step.name} &nbsp;
                {isFinal &&
                    <DisplayStepUni uniId={step?.uniData[0].uni} />
                }
            </span>
            <div className="step-content__container">
                {step.genContent 
                ?
                    <div 
                    className="step-item-content ck-editor"
                    dangerouslySetInnerHTML={{__html: step.genContent}}>
                    </div>
                :   <div className="no-resource-error">
                        עדיין אין תוכן
                    </div>
                }

                {!isObjEmpty(uniContent) &&
                    <UniContent 
                    content={uniContent}
                    pathId={pathId} />
                }
            </div>
        </div>
    )
}

StepContent.propTypes = {
    selStep: PropTypes.object.isRequired
}

export default StepContent
