import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupsContext } from '../GroupsContext'
import DisplayValidError from '../calc-block/NoCalc/DisplayValidError/DisplayValidError'
import SuggestValue from './SuggestValue'

function BlockBody({ 
    calc,
    uniName, 
    suggestValue, 
    display, 
    validError }) {

    return (
        <div className={`calc-block-body 
        ${display ? 'display' : ''}
        ${validError ? 'error' : ''}`}>
            {validError
            ?   <DisplayValidError
                error={validError} />
            
            :   <SuggestValue
                calc={calc}
                uniName={uniName}
                value={suggestValue} />
            }
        </div>
    )
}

export default BlockBody
