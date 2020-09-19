import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from '../../../common/DropdownMenu';
import DataFieldItem from '../data-fields/DataFieldItem';
import VerifyDelete from '../../../common/VerifyDelete';
import { deleteDataGroup } from '../../../../redux/actions/datagroups';
import EditDataGroup from './EditDataGroup';
import AddSubGroup from './AddSubGroup';
import AddFieldToGroup from './AddFieldToGroup';

function DataGroupItem({ group, groups, fields, types }) {
    const children = groups.filter(curGroup => 
        curGroup.parent === group._id)

    const thisGroupFields = fields.filter(field => field.group === group._id) 
    
    const [displayMenu, setDisplayMenu] = useState(false)
    const [displayAddField, setDisplayAddField] = useState(false)
    const [displayAddGroup, setDisplayAddGroup] = useState(false)
    const [displayEdit, setDisplayEdit] = useState(false)
    const [displayVer, setDisplayVer] = useState(false)

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleAddField = open => {
        setDisplayAddField(open)
    }

    const toggleAddGroup = open => {
        setDisplayAddGroup(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "הוסף שדה",
            action: () => toggleAddField(true)
        },
        {
            name: "הוסף קבוצה",
            action: () => toggleAddGroup(true)
        },
        {
            name: "ערוך קבוצה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק קבוצה",
            action: () => toggleVer(true)
        }
    ]

    return (
            <div className="group-item">
            <div className="group-title">
                <span className="group-name">{group.name}</span>
                <div className="group-menu">
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

            <div className="group-content">
                {thisGroupFields.length === 0 && children.length === 0 
                ? (
                    <p>
                        אין שדות או קבוצות בקבוצה זו
                    </p>
                )
                : (
                    <div>
                    {thisGroupFields.length !== 0 && 
                    thisGroupFields.map(field => 
                        field.group === group._id &&
                            <DataFieldItem
                            key={field._id}
                            field={field}
                            types={types} />)}

                    {children.length !== 0 && 
                        <div className="group-children">
                            {children.map(group => 
                                <DataGroupItem 
                                key={group._id}
                                group={group}
                                groups={groups}
                                fields={fields}
                                types={types} />
                            )}
                        </div>}
                    </div>
                )}
            </div>
            
            <AddFieldToGroup
            group={group}
            types={types}
            display={displayAddField}
            toggleModal={toggleAddField} />

            <AddSubGroup
            parentGroup={group}
            display={displayAddGroup}
            toggleModal={toggleAddGroup} />
        
            <EditDataGroup
            display={displayEdit}
            toggleModal={toggleEdit}
            group={group}
            groups={groups} />

            <VerifyDelete
            callback={deleteDataGroup}
            values={[group._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </div>
    )}

DataGroupItem.propTypes = {
    group: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired
}


export default DataGroupItem
