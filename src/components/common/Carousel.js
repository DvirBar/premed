import React, { useEffect, useState } from 'react'
import useWindowDim from './useWindowDim';

const Carousel = ({ className, children }) => {
    const [diffX, setDiffX] = useState(0);
    const [loc, setLoc] = useState(0);
    const [locDiff, setLocDiff] = useState(1);
    const { width } = useWindowDim();

    useEffect(() => {
        if(width < '768') {
            setLocDiff(1)
        }

        else {
            setLocDiff(2)
        }
    })

    const transNeg = () => {
        if(loc > 0) {
            setLoc(loc - 1)
            setDiffX(diffX - 100)
        }
    }

    const transPos = () => {
        if(children.length - loc > locDiff) {
            setLoc(loc + 1)
            setDiffX(diffX + 100)
        }
    }
    
    useEffect(() => {
        console.log(loc);
    }, [loc])
    return (
        <div className={className
            ? `carousel ${className}`
            : 'carousel'}>
            <div className={loc > 0 
                ? "nav-arrow display"
                : "nav-arrow"}>
                <div
                className="material-icons"
                onClick={() => transNeg()}>
                    arrow_forward_ios
                </div>
            </div>
            <div className="carousel-content"> 
                {children.map((child, index) => 
                    <div 
                    key={index} 
                    className="car-item"
                    style={{ transform: `translateX(${diffX}%)`}}> 
                        {child}
                    </div>
                )}
            </div>
            <div className={children.length - loc > locDiff
                ? "nav-arrow display"
                : "nav-arrow"}>
                <div
                className="material-icons"
                onClick={() => transPos()}>
                    arrow_back_ios
                </div>
            </div>
        </div>
    )
}


export default Carousel
