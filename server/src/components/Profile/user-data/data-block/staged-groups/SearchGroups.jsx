import React from 'react'
import FormInput from '../../../../common/FormInput'

function SearchGroups({ keyword, onChange }) {
    const changeKeyword = e => {
        onChange(e.target.value)
    }

    return (
        <div className="search-groups">
            <FormInput
            label="חיפוש"
            type="text"
            value={keyword}
            onChange={changeKeyword} />
        </div>
    )
}

export default SearchGroups
