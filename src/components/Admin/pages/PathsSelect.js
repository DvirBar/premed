import React, { Fragment, useEffect, useState } from 'react'
import InlineMultiSelect from '../../common/InlineMultiSelect'

function PathsSelect({ paths, selPaths, selectPaths }) {

    useEffect(() => {
        selectPaths([paths[0]._id])
    }, [paths])

    return (
        <InlineMultiSelect 
        onChange={selectPaths} 
        NotEmpty={true}>
            {paths.map(path => 
                <InlineMultiSelect.Item 
                id={path._id}
                selected={selPaths.find(selPath => 
                    selPath === path._id) ? true : false}>
                    {path.name}
                </InlineMultiSelect.Item>                            
            )}
        </InlineMultiSelect>
    )
}

export default PathsSelect
