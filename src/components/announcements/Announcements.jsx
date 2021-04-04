import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAncs } from '../../redux/announcements/ancs/actions';
import { ancsSelector, getAllAncs } from '../../redux/announcements/ancs/selectors';
import AncsCarousel from './AncsCarousel/AncsCarousel';
import AncDetails from './AncDetails/AncDetails';
import Loadbar from '../layout/Loadbar'

function Announcements() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAncs())
    }, [])

    const { loading } = useSelector(ancsSelector)
    const ancs = useSelector(getAllAncs)

    const [selAnc, setSelAnc] = useState()
    const [display, setDisplay] = useState(false)
    const selectAnc = anc => {
        setSelAnc(anc)
        setDisplay(true)
    }
    
    if(loading) {
        return <Loadbar />
    }

    return (
        <div className="ancs-container">
            <AncsCarousel 
            selectAnc={selectAnc}
            ancs={ancs} />

            {selAnc &&
                <AncDetails 
                display={display}
                toggleDisplay={setDisplay}
                anc={selAnc} />
            }
            

            <Link 
            className="see-all-ancs"
            to={`/announcements`}>
                צפייה בכל הפרסומים
            </Link>
        </div>
    )
}

export default Announcements
