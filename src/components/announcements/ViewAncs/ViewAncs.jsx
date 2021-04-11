import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AncsList from './AncsList/AncsList'
import FilterAncs from './FilterAncs/FilterAncs'
import { getAncsList } from '../../../redux/announcements/ancs/actions'
import ViewAncsProvider from './ViewAncsContext'
import ContentContainer from '../../layout/ContentContainer/ContentContainer'

function ViewAncs({ isAdmin }) {
    const filtersOnInit = {
        filters: {}
    }

    // Get base data 
    const [ancFilters, setAncFilters] = useState(filtersOnInit)
    
    const dispatch = useDispatch()
    function filterAncs(id) {
        let dataObj = filtersOnInit

        if(ancFilters) {
            dataObj = {
                ...ancFilters,
                lastAncId: id
            }
        }
        
        dispatch(getAncsList(dataObj))
    }

    function changeFilters(name, value) {
        setAncFilters(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    useEffect(() => {
        filterAncs()
    }, [])


    return (
        <ContentContainer>
            <ViewAncsProvider isAdmin={isAdmin}>
                <div className="view-ancs">
                    <FilterAncs 
                    filters={ancFilters}
                    filterAncs={filterAncs}
                    changeFilters={changeFilters} />
                    <AncsList
                    filterAncs={filterAncs} />                        
                </div>
            </ViewAncsProvider>
        </ContentContainer>
        
    )
}

export default ViewAncs
