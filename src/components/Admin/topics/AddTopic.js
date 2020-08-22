import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addTopic } from '../../../redux/actions/topics';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';


function AddTopic({ subpageId, topics, display, toggle, title }) {
    const [parentOptions, setParentOptions] = useState([])
    const [selParent, setSelParent] = useState({})
    
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        url: '',
        subpageId: subpageId
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addTopic, defaultValues)


    // Parent options 
    useEffect(() => {
        setParentOptions([{name: 'ללא שיוך', value: undefined}, 
        ...topics.map(topic => ({
            name: topic.name,
            value: topic._id
        }))])
    }, [topics])

    // Selected option
    useEffect(() => { // Binds the values to selected option
        const parent = values.parentId

        if(parent) {
            const option = parentOptions.find(option => 
                option.value === parent)

            setSelParent({
                name: option.name,
                value: parent
            })}

        // if selected parent is undefined
        else
            setSelParent(parentOptions[0])
    }, [values, parentOptions])

    return (
        <Modal display={display} toggleModal={toggle} title={title}>
            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                label={"שם"}
                type={"text"}
                name={"name"}
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <FormInput
                label={"כתובת"}
                type={"text"}
                name={"url"}
                value={values.url}
                onChange={handleChange}
                error={errors.url} />
                
                {parentOptions.length !== 0 && selParent &&
                    <Dropdown
                    selected={selParent}
                    options={parentOptions}
                    name={"parentId"}
                    title={"שייך ל"}
                    onChange={handleChange}
                    />
                }
                <button type="submit">צור</button>
            </form>
        </Modal>
    )
}

AddTopic.propTypes = {
    pageId: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    display: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default AddTopic
