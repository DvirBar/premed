import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getTopLibs } from '../../../redux/libraries/selectors'
import RecursiveRouter from '../LibDetails/RecursiveRouter'
import LibsList from '../LibsList/LibsList'

function LibsMain() {
    const libs = useSelector(getTopLibs)
    const { libId } = useParams()
    return (
        <div>
            {libId 
            ? <RecursiveRouter />
            : <LibsList 
              noItems={true}
              libs={libs} />   
            }
        </div>
    )
}

export default LibsMain
