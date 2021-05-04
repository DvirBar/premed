import React, { useContext, useEffect } from 'react'
import { Fragment } from 'react';
import TopLinks from '../../../../layout/TopLinks';
import { GroupsContext } from '../../data-block/GroupsContext';

function SelectPaths({ paths }) {
    const {
        selPath,
        setSelPath
    } = useContext(GroupsContext)
    
    useEffect(() => {
        setSelPath(paths[0]?._id)
    }, [paths])

    if(paths.length > 1) {
        return (
            <TopLinks 
            className="top-links-profile-nav"
            selected={selPath}>
                {paths.map(path => 
                    <div 
                    id={path._id}
                    key={path._id}
                    onClick={() => setSelPath(path._id)}>
                        {path.name}
                    </div>
                )}
            </TopLinks>
        )
    }
    
    return <Fragment></Fragment>
}

export default SelectPaths
