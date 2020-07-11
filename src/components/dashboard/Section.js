import React, { useState, useEffect } from 'react';
import GridItem from './GridItem';

function Section(props) {
    const [section, setSection] = useState(props.section);

    return (
        <div className="section">
            <p className="section-name">{section.name}</p>
            <div className="items-grid">
                {section.items.length === 0 
                 ? <p>עדיין לא הוספת כלום.</p>
                 : section.items.map(item => (
                    <GridItem key={item.key} item={item} />))}
            </div>
        </div>
    )
}

export default Section;
