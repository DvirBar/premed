import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { editTopic, deleteTopic } from '../../../redux/actions/topics';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import VerifyDelete from '../../common/VerifyDelete';


function TopicContent({ topic, topics }) {
    const [parentOptions, setParentOptions] = useState([])
    const [selParent, setSelParent] = useState({})
    const [showVer, setShowVer] = useState(false)
    const [dropDefault, setDropDefault] = useState({})
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: topic.name,
            description: topic.description,
            url: topic.url,
            parentId: topic.parent
        })
    }, [topic, topics])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editTopic, defaultValues, topic._id)

    // Parent options 
    useEffect(() => {
        const filtTopics = topics.filter(curTopic => 
            curTopic._id !== topic._id)

        setParentOptions([{name: 'ללא שיוך', value: undefined}, 
        ...filtTopics.map(topic => ({
            name: topic.name,
            value: topic._id
        }))])
    }, [topics, topic])

    // Selected option
    useEffect(() => { // Binds values to selected option
        setDropDefault(parentOptions.find(option => 
            option.value === topic.parent))
    }, [topic, parentOptions])

    const toggleVer = open => {
        setShowVer(open)
    }

    return (
        <div className="topic-content">
            <form 
            onSubmit={handleSubmit}
            className="form-edit-topic" 
            noValidate>
                <div className="topic-headers">
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
                        options={parentOptions}
                        defaultOption={dropDefault}
                        name={"parentId"}
                        title={"שייך ל"}
                        onChange={handleChange}
                        />
                    }
                </div>

                <textarea 
                cols="80" rows="5"
                placeholder="תיאור"
                name="description"
                value={values.description || ''}
                onChange={handleChange} />

                <div className="form-buttons">
                    <button type="submit">עדכן</button>
                    <button 
                    className="danger"
                    onClick={() => toggleVer(true)}>מחק</button>
                </div>
            </form>
            <VerifyDelete
            callback={deleteTopic}
            values={[topic._id]}
            display={showVer}
            toggleModal={setShowVer} />
        </div>
    )
}

export default TopicContent
