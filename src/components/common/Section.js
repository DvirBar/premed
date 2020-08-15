import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Section({ title, children }) {
    const [display, setDisplay] = useState(false);

    const toggleDisplay = () => {
        setDisplay(!display);
    }
    
    return (
        <div>
            <p className="section-header">
                <span 
                className="section-title"
                onClick={() => toggleDisplay()}>{title}</span>
            </p>
            <div className={display 
                ? "section-content open" 
                : "section-content"}>
                <div className="section-content-holder">
                    {children}
                </div>
            </div>
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired
}

export default Section


