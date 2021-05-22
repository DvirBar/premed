import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getTopLibs } from '../../../redux/libraries/selectors'
import RecursiveRouter from '../LibDetails/RecursiveRouter'
import LibsMainDefault from './LibsMainDefault'

function LibsMain() {
    const libs = useSelector(getTopLibs)
    const { libId } = useParams()
    return (
        <div>
            {libId 
            ? <RecursiveRouter />
            : <LibsMainDefault
              libs={libs} />   
            }
        </div>
    )
}

export default LibsMain
