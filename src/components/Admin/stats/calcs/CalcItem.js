import React, { Fragment, useEffect, useState } from 'react';
import DropdownMenu from '../../../common/DropdownMenu';
import VerifyDelete from '../../../common/VerifyDelete';
import ValidModal from '../valids/ValidModal';
import { deleteCalc } from '../../../../redux/actions/calculations';
import EditCalc from './EditCalc';
import ShortValidList from '../valids/ShortValidList';
import CalcDetails from './CalcDetails';

function CalcItem({ calc, field, types, storedCalcs }) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayCalcDetails, setDisplayCalcDetails] = useState(false);
    const [displayValDetails, setDisplayValDetails] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false);

    const storedCalc = storedCalcs.find(storCalc => 
        storCalc.id === calc.calc)

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleCalcDetails = open => {
        setDisplayCalcDetails(open)
    }

    const toggleValDetails = open => {
        setDisplayValDetails(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "ערוך שדה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק שדה",
            action: () => toggleVer(true)
        }
    ]

    return (
        <Fragment>
             <div className="calc-item">
                <div className="calc-top">
                    <div className="calc-title">
                        <span className="calc-name">
                            {calc.name}
                        </span>
                        <div className="calc-menu">
                            <i 
                            className="material-icons"
                            onClick={() => toggleMenu(!displayMenu)}>
                                more_vert
                            </i>
                            <DropdownMenu
                            display={displayMenu}
                            toggleMenu={toggleMenu}
                            options={options} />
                        </div>
                    </div>
                    <span className="calc-brand">
                        שקלול
                    </span>
                </div>

                <div className="calc-section">
                    <div className="valid-list-title">
                        שקלול
                    </div>
                    <span>{storedCalc.name}</span>
                    <span 
                    className="calc-details-link"
                    onClick={() => toggleCalcDetails(true)}>
                        פירוט הפרמטרים
                    </span>
                </div>
            
                <div className="calc-section">
                    <div className="valid-list-title">
                        <span>מאמתים:</span>
                        <i 
                        className="material-icons"
                        onClick={() => toggleValDetails(true)}>
                            create
                        </i>
                    </div>
                    <div className="valid-short">
                        {field &&
                             <ShortValidList
                             fieldValids={field?.validators}
                             validTypes={types.validationTypes} />
                        }
                    </div>                    
                </div>
            </div>

            <EditCalc
            display={displayEdit}
            toggleModal={toggleEdit}
            calc={calc}
            storedCalcs={storedCalcs} />

            <VerifyDelete
            callback={deleteCalc}
            values={[calc._id]}
            display={displayVer}
            toggleModal={toggleVer} />
            
            {Object.keys(types).length !== 0 &&
                <ValidModal
                display={displayValDetails}
                toggleModal={toggleValDetails}
                field={field}
                types={types} />
            }

            <CalcDetails
            display={displayCalcDetails}
            toggleModal={toggleCalcDetails}
            storedCalc={storedCalc} />
        </Fragment>
    )
}

export default CalcItem
