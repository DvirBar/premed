import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterData, clearFilters, sortData } from '../../redux/actions/userdata';
import Modal from '../layout/Modal';
import Dropdown from '../common/Dropdown';

function FieldOptions({ field, ordering, display, toggleModal, title }) {
    const dispatch = useDispatch();

    const [minVal, setMinVal] = useState('');
    const [maxVal, setMaxVal] = useState('');
    const [fieldOptions, setFieldOptions] = useState([]);
    const [selOption, setSelOption] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        if(field.fieldOptions) {
            setFieldOptions(field.fieldOptions.map(option => ({
                name: option,
                value: option
            })))
        }
    }, [field])

    useEffect(() => {
        let fieldFilter = ordering.filters.find(filter =>
            filter.field.id === field._id)

        console.log(fieldFilter); 

        setMinVal(fieldFilter?.min || '')
        setMaxVal(fieldFilter?.max || '')
        setSort(ordering.sort.fieldId === field._id 
            ? ordering.sort.type : '')
    }, [field, ordering])

    const toggleSort = sortType => {
        if(sort === sortType)
            setSort(undefined)

        else
            setSort(sortType)
    }

    const selectOption = option => {
        setSelOption(option.value)
    }

    const setDataOrdering = () => {
        if(maxVal !== '' || minVal !== '') {
            const filter = {
                min: minVal,
                max: maxVal,
                field: {
                    id: field._id,
                    name: field.name,
                    type: 'num'
                }
            }

            dispatch(filterData(filter))
        }

        if(selOption !== '') {
            const filter = {
                text: selOption,
                field: {
                    id: field.id,
                    type: 'str'
                }
            }

            dispatch(filterData(filter))
        }

        if(sort) {
            dispatch(sortData(sort, field._id))
        }
        
        toggleModal(false)
    }

    const clearFilter = fieldId => {
        dispatch(clearFilters(fieldId))
    }

    const clearAllFilters = () => {
        dispatch(clearFilters())
    }

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={title}>
            <div className="field-options">
                <div className="filters">
                    <p className="filters-title">סינון:</p>
                    <div className="filters-list">
                        {ordering.filters.length === 0
                        ? <p className="no-filters">
                            אין מסננים
                        </p>
                        : ordering.filters.map(filter => 
                            <span
                            key={filter.field.id}
                            className="filter-item">
                                <span>{filter.field.name}</span>
                                <i className="material-icons"
                                onClick={() => clearFilter(filter.field.id)}>
                                    close
                                </i>
                            </span>
                            )
                        }
                    </div>
                    <p 
                    className="clear-all"
                    onClick={() => clearAllFilters()}>איפוס סינון</p>
                    
                    <div className="filter-fields">
                        {field.dataType === 'num' 
                        ?   <Fragment>
                                <input 
                                type="text" 
                                className="form-default"
                                value={minVal}
                                onChange={e => setMinVal(e.target.value)}
                                placeholder="גדול מ-" />
                                
                                <input 
                                type="text" 
                                className="form-default"
                                value={maxVal}
                                onChange={e => setMaxVal(e.target.value)}
                                placeholder="קטן מ-" />
                            </Fragment>
                        : field.fieldOptions && field.fieldType === 'select' &&
                            <Fragment>
                                <Dropdown
                                options={fieldOptions}
                                title="סינון לפי"
                                onChange={selectOption}
                                placeholder="בחירה" />
                            </Fragment>    
                        }    
                    </div>
                </div>

                <div className="sort">
                    <p className="sort-title">מיון:</p>
                    <div className="sort-fields">
                        <span 
                        className={sort === 'ascending'
                        ? "sort-item selected"
                        : "sort-item"}
                        onClick={() => toggleSort('ascending')}>
                            בסדר עולה
                        </span>
                        <span 
                        className={sort === 'descending'
                        ? "sort-item selected"
                        : "sort-item"}
                        onClick={() => toggleSort('descending')}>
                            בסדר יורד
                        </span>
                    </div>
                </div>
                <button onClick={() => setDataOrdering()}>החלה</button>
            </div>
        </Modal>
    )
}

export default FieldOptions
