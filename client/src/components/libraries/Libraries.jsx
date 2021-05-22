import React, { Fragment, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getLibraries } from '../../redux/libraries/actions'
import { librariesSelector } from '../../redux/libraries/selectors'
import Loadbar from '../layout/Loadbar'
import LibraryRouter from './LibraryRouter'
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer'
import { LibraryContext } from './LibraryContext'
import PathLinks from './PathLinks'
import LibraryMenu from './LibraryMenu/LibraryMenu'

function Libraries() {
    const { pathId } = useParams()
    
    const dispatch = useDispatch()

    // Get libraries from api by selected path
    useEffect(() => {
        if(pathId) {
            dispatch(getLibraries(pathId))
        }

    }, [pathId])

    const { 
        loading
    } = useSelector(librariesSelector)

    const {isAdmin} = useContext(LibraryContext)

    return (
        <div className="libraries">
            {!isAdmin &&
                <PathLinks />
            }
            <ContentContainer>
                {loading
                    ?   <Loadbar />
                    :  <Fragment>
                            <LibraryMenu />
                            <LibraryRouter />
                        </Fragment>    
                }
            </ContentContainer>
        </div>
    )
}

export default React.memo(Libraries)
