import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../../forms/useForm';
import { editDataGroup } from '../../../../redux/actions/datagroups';
import FormInput from '../../../common/FormInput';
import Dropdown from '../../../common/Dropdown';
import Modal from '../../../layout/Modal';

function EditDataGroup({ display, toggleModal, group, groups }) {
    const [defaultValues, setDefaultValues] = useState({
        name: group.name,
        parentId: group.parent
    })
    const [groupOptions, setGroupOptions] = useState([])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editDataGroup, defaultValues, group._id)

    useEffect(() => {
        const filtGroups = groups.filter(curGroup => 
            curGroup._id !== group._id)

        setGroupOptions([{ name: 'ללא', value: undefined }, 
        ...filtGroups.map(group => ({
            name: group.name,
            value: group._id
        }))])

    }, [groups]) 
        

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={"ערוך קבוצת נתונים"}>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                {groupOptions.length !== 0 &&
                    <Dropdown
                    options={groupOptions}
                    name="parentId"
                    defaultOption={groupOptions.find(option => 
                        values.parentId === option.value)}
                    title="קבוצת נתונים"
                    onChange={handleChange} />
                }           

                <button type="submit">ערוך</button>
            </form>
        </Modal>
    )
}

export default EditDataGroup
