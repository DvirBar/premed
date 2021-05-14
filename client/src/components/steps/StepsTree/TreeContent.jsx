import React, { useContext, useEffect, useRef } from 'react'
import useWindowDim from '../../common/useWindowDim';
import StepsLevel from './StepsLevel';
import LinkProvider from './TreeLink/LinkContext';
import { LinkContext } from './TreeLink/LinkContext';

function TreeContent({ firstStep }) {
    return (
        <div 
        className="steps-tree-wrapper">
            <div className="steps-tree noselect">
                <LinkProvider>
                    <StepsLevel
                    childrenGroup={true}
                    nextSteps={[firstStep]}/>
                </LinkProvider>
            </div>
        </div>
    )
}

export default TreeContent
