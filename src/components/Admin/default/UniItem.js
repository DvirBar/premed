import React, { useState } from 'react'
import PropTypes from 'prop-types';
import DropdownMenu from '../../common/DropdownMenu';
import EditUni from './EditUni';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteUni } from '../../../redux/actions/universities';

function UniItem({ uni }) {
    const [displayMenu, setDisplayMenu] = useState(false)
    const [displayEdit, setDisplayEdit] = useState(false)
    const [displayVer, setDisplayVer] = useState(false)

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const options = [
        {
            name: "ערוך",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק",
            action: () => toggleVer(true)
        }
    ]

    return (
        <li className="uni-item">
            <div className="details-section">
                <span 
                className="uni-color"
                style={{backgroundColor: uni.color}}></span>
                <p>
                    <span>{uni.name}</span>
                    <span className="uni-paths">
                        {uni.paths.map(path =>
                            <span className="uni-path-item">
                                {path.name}
                            </span>)}
                    </span>
                </p>
            </div>
            <div className="uni-menu">
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

            <EditUni
            display={displayEdit}
            toggleModal={toggleEdit}
            uni={uni} />

            <VerifyDelete
            callback={deleteUni}
            values={[uni._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </li>
    )
}

export default UniItem
