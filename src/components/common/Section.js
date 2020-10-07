import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Section({ children }) {
    const title = React.Children.map(children, child => 
        child.type.displayName === 'Title' ? child : null);

    const header = React.Children.map(children, child => 
        child.type.displayName === 'Header' ? child : null);

    const headerLeft = React.Children.map(children, child => 
        child.type.displayName === 'HeaderLeft' ? child : null);

    const body = React.Children.map(children, child => 
        child.type.displayName === 'Body' ? child : null);

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
                <span 
                className="section-header-rest">{header}</span>
            </p>
            <div className={display 
                ? "section-content open" 
                : "section-content"}>
                <div className="section-content-holder">
                    {body}
                </div>
            </div>
        </div>
    )
}

const Title = ({ children }) => children;
Title.displayName = 'Title';
Section.Title = Title;

const Header = ({ children }) => children;
Header.displayName = 'Header';
Section.Header = Header;

const Body = ({ children }) => children;
Body.displayName = 'Body';
Section.Body = Body;

Section.propTypes = {
    title: PropTypes.string.isRequired
}

export default Section


