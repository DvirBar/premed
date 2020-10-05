import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../common/useOnClickOutside';

function ArgsMissingList({ argsMissing }) {
    const ref = useRef()
    const [showList, setShowList] = useState(false);

    useOnClickOutside(ref, showList, () => setShowList(!showList))

    return (
        <div className="args-missing-block">
            <i 
            className="material-icons"
            onClick={() => setShowList(!showList)}>
                help
            </i>    
            <ul ref={ref} className={showList
                ? "args-missing-list display"
                : "args-missing-list"}>
                {argsMissing.map(arg => 
                    <li key={arg.role}>{arg}</li>                        
                )}
            </ul>
        </div>
        
    )
}

ArgsMissingList.propTypes = {
    argsMissing: PropTypes.array.isRequired
}

export default ArgsMissingList
