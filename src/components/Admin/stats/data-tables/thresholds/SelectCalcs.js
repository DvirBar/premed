import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCalcFieldsByUnis } from '../../../../../redux/selectors/datafields';
import Dropdown from '../../../../common/Dropdown';
import { getCalcsByUniAndPath } from '../../../../../redux/selectors/statsinputs';

function SelectCalcs({ pathId, uniId, selectField }) {
    const calcFields = useSelector(getCalcsByUniAndPath(pathId, uniId))
    console.log(calcFields);
    const options = calcFields.map(field => ({
        name: field.name,
        value: field._id
    }))

    useEffect(() => {
        selectField({value: undefined})
    }, [pathId, uniId])

    return (
        <Fragment>
            {options && options.length !== 0 &&
                <Dropdown
                options={options}
                title="שקלול"
                onChange={selectField}
                placeholder="בחירה" />}
        </Fragment>
    )
}

SelectCalcs.propTypes = {
    selectField: PropTypes.func.isRequired
}

export default SelectCalcs
