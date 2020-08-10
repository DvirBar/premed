import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../common/Dropdown';

function SelectParentPrev({ steps, handleChange, selStep }) {
    const [parentOptions, setParentOptions] = useState([])
    const [prevOptions, setPrevOptions] = useState([])
    const [selParent, setSelParent] = useState({})
    const [selPrev, setSelPrev] = useState({})
    const [siblings, setSiblings] = useState([])

    // Parents dropdown
    useEffect(() => {
        setParentOptions([{name: 'ללא שיוך', value: undefined}, ...steps.map(step => ({
            name: step.name,
            value: step._id
        }))])
        }, [steps])

    // Get new siblings when changing parent
    useEffect(() => { 
        if(selParent) {
            setSiblings(steps.filter(step => step.parent === selParent.value))

            if(selStep)
                setSiblings(steps.filter(step => step._id !== selStep._id))
        }
    }, [selParent, steps, selStep]) 

    useEffect(() => {
        console.log(siblings)
    }, [siblings])

    // Siblings of top level
    useEffect(() => { 
        if(siblings.length === 0 && steps.length !== 0) {
            setSiblings(steps.filter(step => !step.parent))
            
            if(selStep)
                setSiblings(steps.filter(step => step._id !== selStep._id))
        }
    }, [steps, siblings, selStep]) 

     // Previous step dropdown
     useEffect(() => {
        if(siblings)
            setPrevOptions([{name: 'ללא', value: undefined}, ...siblings.map(sibling => ({
                name: sibling.name,
                value: sibling._id
            }))])

        }, [siblings])

    // Get default values for parent and prev
    useEffect(() => {
        if(selStep) {
            setSelParent(parentOptions.find(
                parent => parent.value === selStep.parent))
    
            setSelPrev(prevOptions.find(
                prev => prev.value === selStep.prev))
        }
    }, [parentOptions, prevOptions, selStep])

    // useEffect(() => {
    // }, [prevOptions, defaultPrev])

    const changeSelParent = (event, selectedName) => {
        handleChange(event);
        setSelParent({name: selectedName, value: event.target.value})
    }

    const changeSelPrev = (event, selectedName) => {
        handleChange(event);
        setSelPrev({name: selectedName, value: event.target.value})
    }

    useEffect(() => {
        setSelPrev(prevOptions[0])
    }, [prevOptions])

    return (
        <div className="select-parent-prev">
            {parentOptions.length !== 0 && selParent &&
                    <Dropdown
                    selected={selParent}
                    options={parentOptions}
                    name={"parentId"}
                    title={"שייך ל"}
                    onChange={changeSelParent}
                    id={"select-parent"}
                    />
            }

            {prevOptions.length !== 0 && selPrev && 
                    <Dropdown
                    selected={selPrev}
                    options={prevOptions}
                    name={"prevId"}
                    title={"ממשיך את השלב"}
                    onChange={changeSelPrev}
                    id={"select-prev"}/>
            }
        </div>
    )
}

SelectParentPrev.propTypes = {
    steps: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selStep: PropTypes.object
}

export default SelectParentPrev
