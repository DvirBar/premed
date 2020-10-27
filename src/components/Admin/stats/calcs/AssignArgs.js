import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import Dropdown from '../../../common/Dropdown';
import Modal from '../../../layout/Modal';
import { dataFieldAssignRole } from '../../../../redux/actions/datafields';
import { dataGroupAssignRole } from '../../../../redux/actions/datagroups';
import { calcAssignRole } from '../../../../redux/actions/calculations';
import GroupArg from './GroupArg';

function AssignArgs({ storedCalcs, fields, groups }) {
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false)
    const [argArr, setArgArr] = useState([])
    const subTitle = "יש לבחור את השדות, הקבוצות או השקלולים המתאימים שמהם ילקח המידע";
    
    useEffect(() => {   
        storedCalcs.map(calc => {
            calc.args.map(arg => {
                if(!argArr.find(item => item.role === arg.role)) {
                    setArgArr(arr => [...arr, arg])
                }
            })})
    }, [storedCalcs])


    // Map field options
    const [fieldOptions, setFieldOptions] = useState([])

    useEffect(() => {
        // Use fields that are numbers
        let tempFields = fields.filter(field => 
            field.dataType === 'num' && !field.group)
                
        setFieldOptions(tempFields.map(field => ({
            name: field.name,
            value: field._id,
            type: 'field',
            role: field.role,
            forbidden: field.role ? true : false
        })))
    }, [fields])


    // Map group options
    const [groupOptions, setGroupOptions] = useState([])
    
    useEffect(() => {
        setGroupOptions(groups.map(group => ({
            name: group.name,
            value: group._id,
            type: 'group',
            role: group.role,
            forbidden: group.role ? true : false
        })))
    }, [groups])


    // // Map calc options
    // const [prevCalcOptions, setPrevCalcOptions] = useState([])

    // useEffect(() => {
    //     setPrevCalcOptions(calcs.map(calc => ({
    //         name: calc.name,
    //         value: fields.find(field => 
    //             field.calcOutput === calc._id)?._id,
    //         type: 'calc',
    //         role: calc.role,
    //         forbidden: calc.role ? true : false
    //     })))
    // }, [calcs])

    const matchArgType = type => {
        switch(type) {
            case "field": 
                return {
                    title: 'שדה נתונים',
                    name: 'calcFieldsIds',
                    options: fieldOptions,
                    callback: dataFieldAssignRole
                }
            case "group":
                return {
                    title: 'קבוצת נתונים',
                    name: 'groupIds',
                    options: groupOptions,
                    callback: dataGroupAssignRole
                }
            default:
                return;
        }
    }

    const findRoleBind = (arg, options) => {
        const defOption = options.find(option => 
            option.role === arg.role)
        return defOption
    }

    const assignOption = option => {
        const callback = matchArgType(option.type).callback
        const dataObj = {
            role: option.key
        }

        dispatch(callback(option.value, dataObj))
    }

    const toggleModal = open => {
        setDisplay(open)
    }

    return (
        <Fragment>
            <i 
            className="material-icons"
            onClick={() => toggleModal(true)}>
                settings
            </i>
            <Modal 
            display={display}
            toggleModal={toggleModal}
            title="הקצאת פרמטרים"
            subTitle={subTitle}>
                <div className="arg-block">
                {argArr.length !== 0 && 
                    argArr.map(arg => 
                        arg.type === "group"
                        ? (
                            <GroupArg
                            arg={arg}
                            fields={fields}
                            groupOptions={groupOptions}
                            findRoleBind={findRoleBind}
                            assignOption={assignOption} />
                        )
                        
                        : (
                            <div className={findRoleBind(arg, 
                                matchArgType(arg.type).options)
                                ? "role-block"
                                : "role-block not-assigned"}>
                                <span>{arg.name}</span>
                                <Dropdown
                                key={arg.role}
                                options={matchArgType(arg.type).options}
                                defaultOption={findRoleBind(arg, 
                                    matchArgType(arg.type).options)}
                                name={matchArgType(arg.type).name}
                                title={matchArgType(arg.type).title}
                                onChange={assignOption}
                                placeholder="בחירה"
                                uniqueListKey={arg.role} />
                            </div>
       
                        ))}
                </div>
            </Modal>
        </Fragment>
    )
}

export default AssignArgs
