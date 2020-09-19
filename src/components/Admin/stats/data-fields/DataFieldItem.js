import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DropdownMenu from '../../../common/DropdownMenu';
import EditDataField from './EditDataField';
import VerifyDelete from '../../../common/VerifyDelete';
import { deleteDataField } from '../../../../redux/actions/datafields';
import ValidItem from '../valids/ValidItem'
import ValidModal from '../valids/ValidModal';

function DataFieldItem({ field, types }) {
    const dataTypeName = types?.dataTypes?.find(type => 
        type.value === field.dataType).name;

    const fieldTypeName = types?.fieldTypes?.find(type =>
        type.value === field.fieldType).name;
    
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayValDetails, setDisplayValDetails] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false);

    const groupSelector = useSelector(state => state.datagroups)
    const groups = groupSelector.groups

    const toggleMenu = open => {
        setDisplayMenu(open)
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
            <div className="data-field">
                <div className="field-title">
                    <span className="field-name">
                        {field.name}
                    </span>
                    <span className="field-type">
                        {dataTypeName}, &nbsp;
                        {fieldTypeName}
                    </span>
                    <div className="field-menu">
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
                <div className="field-body">
                    <p className="valid-list-title">
                        <span>מאמתים:</span>
                        <i 
                        className="material-icons"
                        onClick={() => toggleValDetails(true)}>
                            create
                        </i>
                    </p>
                    <div className="valid-short">
                        {field.validators?.map(valid => 
                            <ValidItem 
                            key={valid._id}
                            valid={valid}
                            validTypes={types.validationTypes}
                            />)}
                    </div>
                </div>
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

            <ValidModal
            display={displayValDetails}
            toggleModal={toggleValDetails}
            field={field}
            types={types} />
            

        </Fragment>
    )
}

DataFieldItem.propTypes = {
    field: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired
}

export default DataFieldItem
