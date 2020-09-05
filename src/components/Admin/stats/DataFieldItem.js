import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DropdownMenu from '../../common/DropdownMenu';
import EditDataField from './EditDataField';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteDataField } from '../../../redux/actions/datafields';

function DataFieldItem({ field, types }) {
    const typeName = types.fieldTypes.find(type =>
        type.value === field.fieldType).name
    
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false);

    const groupSelector = useSelector(state => state.datagroups)
    const groups = groupSelector.groups

    const toggleMenu = open => {
        setDisplayMenu(open)
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
            <div className="data-field">
                <p className="field-title">
                    <span className="field-name">
                        {field.name}
                    </span>
                    <span className="field-type">
                        {typeName}
                    </span>
                    <span className="field-menu">
                        <i 
                        className="material-icons"
                        onClick={() => toggleMenu(!displayMenu)}>
                            more_vert
                        </i>
                        <DropdownMenu
                        display={displayMenu}
                        toggleMenu={toggleMenu}
                        options={options} />
                    </span>
                </p>
            </div>
            <EditDataField 
            display={displayEdit}
            toggleModal={toggleEdit}
            field={field}
            fieldTypes={types.fieldTypes}
            groups={groups} />

            <VerifyDelete
            callback={deleteDataField}
            values={[field._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </Fragment>
    )
}

DataFieldItem.propTypes = {
    field: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired
}

export default DataFieldItem
