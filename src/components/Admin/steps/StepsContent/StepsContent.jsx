import React from 'react'
import { useSelector } from 'react-redux'
import { pathsSelector } from '../../../../redux/selectors/paths'
import Loadbar from '../../../layout/Loadbar'
import StepsBlock from './StepsBlock'
import TopSection from './TopSection'

function StepsContent() {
    const {
        paths,
        loading
    } = useSelector(pathsSelector)

    if(loading || !paths) {
        return <Loadbar />
    }

    return (
        <div className="steps-content">
            <TopSection 
            paths={paths} />

            <StepsBlock />
        </div>
    )
}

export default StepsContent
