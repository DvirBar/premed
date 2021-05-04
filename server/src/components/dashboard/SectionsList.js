import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from '../../redux/actions/sections';
import Section from './Section';

function SectionsList() {
    const dispatch = useDispatch();

    useEffect(() => { // Get sections only on initial mount
        dispatch(getSections());
    }, []);

    const [sections, setSections] = useState([]);
    const selectedSections = useSelector(state => state.sections);
    const fetchedSections = selectedSections.sections;
    const loading = selectedSections.loading

    useEffect(() => { // Bind selector to local state
        setSections(fetchedSections);
    }, [fetchedSections])


    if(loading) 
        return <p>Loading...</p>;

    if(!loading && sections.length === 0)
        return <p>עדיין לא הוספת כלום.</p>;

    else {
        return (
            <div className="sections-list">   
                {sections.map(section => (
                    <Section key={section.id} section={section} />
                ))}
            </div>
        )
    }
}

export default SectionsList;
