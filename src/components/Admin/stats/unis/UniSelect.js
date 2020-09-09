import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../common/Dropdown';

function UniSelect({ selPath, unis, selectUni }) {
    const [uniOptions, setUniOptions] = useState([])

    useEffect(() => {
        const filtPaths = unis.filter(uni => 
            uni.paths.find(path => path._id === selPath.value))

        setUniOptions([{name: 'ללא', value: undefined},
        ...filtPaths.map(uni => ({
            name: uni.name,
            value: uni._id
        }))])
    }, [unis, selPath])

    return (
        <Fragment>
            {unis?.length !== 0 &&
                <Dropdown
                options={uniOptions}
                title="אוניברסיטה"
                onChange={selectUni} />
            }
        </Fragment>
    )
}

export default UniSelect
