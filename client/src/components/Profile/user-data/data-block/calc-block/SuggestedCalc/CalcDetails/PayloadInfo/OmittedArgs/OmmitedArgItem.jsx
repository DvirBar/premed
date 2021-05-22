import { Close } from '@material-ui/icons'
import React from 'react'
import DisplayGroupName from '../AddedArgs/DisplayGroupName'

function OmmitedArgItem({ arg }) {
    return (
        <div 
        key={arg}
        className="payload-info__omitted-args__list__item">
            <Close />
            <div>
                <DisplayGroupName 
                argValue={arg} />
            </div>
        </div>    
    )
}

export default OmmitedArgItem
