import { Close } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getGroupById } from '../../../../../../../../../redux/selectors/statsinputs'

function OmmitedArgItem({ arg }) {
    const group = useSelector(getGroupById(arg))

    return (
        <div 
        key={arg}
        className="payload-info__omitted-args__list__item">
            <Close />
            <div>
                {group.name}
            </div>
        </div>    
    )
}

export default OmmitedArgItem
