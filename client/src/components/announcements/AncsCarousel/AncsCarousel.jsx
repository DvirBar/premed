import React from 'react';
import Carousel from '../../common/Carousel';
import AncCarItem from './AncCarItem/AncCarItem';

function AncsCarousel({ ancs, selectAnc }) {
    return (
        <Carousel className="ancs-carousel">
            {ancs.map(anc =>
                <AncCarItem 
                key={anc._id} 
                selectAnc={selectAnc}
                anc={anc} />)}
        </Carousel>
    )
}

export default AncsCarousel
