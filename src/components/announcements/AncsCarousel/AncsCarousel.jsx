import React from 'react';
import Carousel from '../../common/Carousel';
import AncCarItem from './AncCarItem/AncCarItem';

function AncsCarousel({ ancs,selectAnc }) {
    return (
        <Carousel className="ancs-carousel">
            {ancs.map(anc =>
                <AncCarItem 
                key={anc.id} 
                selectAnc={selectAnc}
                anc={anc} />)}
        </Carousel>
    )
}

export default AncsCarousel
