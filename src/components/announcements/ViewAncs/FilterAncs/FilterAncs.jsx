import React from 'react'
import { useSelector } from 'react-redux'
import { getGroups } from '../../../../redux/announcements/groups/selectors'
import Dropdown from '../../../common/Dropdown'
import FormInput from '../../../common/FormInput'
import DatePicker from '../../../common/DatePicker'

function FilterAncs({ filters, changeFilters, filterAncs }) {
    const groups = useSelector(getGroups)
    const options = [
        {
            name: 'הכל',
            value: undefined
        },
        ...groups.map(group => ({
            name: group.name,
            value: group._id
        }))
    ]

    const handleFilterChange = event => {
        let valueObj = event
        if(event.target) {
            valueObj = event.target
        }
        
        const name = valueObj.name
        const value = valueObj.value
        changeFilters(name, value)
    }

    
    return (
        <div className="filter-ancs">
            <div className="filter-ancs__title">
                סינון פרסומים
            </div>
            <div className="filter-ancs__body">
                <Dropdown 
                options={options} 
                name="group" 
                title="קבוצה"
                defaultOption={options[0]}
                onChange={handleFilterChange} />

                <FormInput
                name="name"
                label="שם"
                value={filters.name}
                onChange={handleFilterChange} />
        
                <div className="filter-ancs__body__dates">
                    <DatePicker
                    label="פורסם מ-"
                    name="minDate"
                    value={filters.minDate}
                    onChange={handleFilterChange} />

                    <DatePicker
                    label="פורסם עד"
                    name="maxDate"
                    value={filters.maxDate}
                    onChange={handleFilterChange} />
                </div>

                <button 
                onClick={() => filterAncs()}>
                    סינון
                </button>
            </div>
            
        </div>
    )
}

export default FilterAncs
