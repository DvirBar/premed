import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addDataGroup } from '../../../redux/actions/datagroups';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';

function AddDataGroup({ path, groups }) {
    const [displayModal, setDisplayModal] = useState(false)
    const [defaultValues, setDefaultValues] = useState({})
    const [groupOptions, setGroupOptions] = useState([])

    useEffect(() => {
        setDefaultValues({
            name: '',
            pathId: path.value
        })
    }, [path])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addDataGroup, defaultValues)

    useEffect(() => {
        setGroupOptions([{ name: 'ללא', value: undefined }, 
        ...groups.map(group => ({
            name: group.name,
            value: group._id
        }))])
    }, [groups]) 
        
    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
            <Fragment>
            <button onClick={() => toggleModal(true)}>
                הוסף קבוצה
            </button>
            <Modal
            display={displayModal}
            toggleModal={toggleModal}
            title={"הוסף קבוצת נתונים"}>
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
                        title="קבוצת נתונים"
                        onChange={handleChange} />
                    }           

                    <button type="submit">הוסף</button>
                </form>
            </Modal>
        </Fragment>
    )
}

AddDataGroup.propTypes = {
    path: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired
}

export default AddDataGroup
