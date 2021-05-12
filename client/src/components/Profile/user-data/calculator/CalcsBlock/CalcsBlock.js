import React, { useState, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import CalcItemInfo from './CalcItemInfo';
import CalcUnisList from './CalcUnisList';
import { CalculatorContext } from '../CalculatorContext';
import useWindowDim from '../../../../common/useWindowDim';

export default function CalcsBlock({ calcs, changeStartSimulate }) {
    const [display, setDisplay] = useState(true)

    const {
        values,
        setDisplay: setDisplayInfo
    } = useContext(CalculatorContext)

    const {
        display: displayInfo
    } = values 

    const handleExpander = () => {
        if(displayInfo) {
            setDisplayInfo(false)
        }

        else {
            setDisplay(!display)
        }
    }
    const {
        height
    } = useWindowDim()

    const exitCalcsOpen = {
        top: height - 130
    }

    const exitCalcsClose = {
        top: height - 80
    }

    const calcsBlockStyleOpen = {
        top: height - 100
    }

    const calcsBlockStyleClose = {
        top: height
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"

    return (
        <Fragment>
            <div 
            onClick={handleExpander}
            style={display ? exitCalcsOpen : exitCalcsClose}
            className={`exit-calcs-block
            ${display ? 'display' : ''}
            ${displayInfo ? 'displayInfo' : ''}`}>
                <i className="material-icons">
                {display   
                    ? displayInfo 
                        ?   'expand_more'
                        :   'close'
                    : 'expand_less'
                }
                </i>
            </div>
            <div 
            style={display ? calcsBlockStyleOpen : calcsBlockStyleClose}
            className={`calculator-calcs-block
            ${display ? 'display' : ''}
            ${displayInfo ? 'displayInfo' : ''}`}> 
                <CalcUnisList 
                calcs={calcs}
                changeStartSimulate={changeStartSimulate} /> 

                <CalcItemInfo />  
            </div>
        </Fragment>
    )
}

CalcsBlock.propTypes = {
    calcs: PropTypes.array.isRequired
}
