import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddLink from './AddLink';
import LinkItem from './LinkItem';

function LinksList({ subpage, pageId }) {
    const links = subpage.links
    const [displayAdd, setDisplayAdd] = useState(false);

    const toggleAdd = open => {
        setDisplayAdd(open)
    }

    return (
        <Fragment>
            <ul className="links-list">
                {subpage.links.length !== 0
                ?   links.map(link => 
                        <LinkItem
                        link={link}
                        subpageId={subpage._id}
                        pageId={pageId} />
                    )
                :   <li>אין קישורים</li>
                }
                <li 
                className="add-subpage-link"
                onClick={() => toggleAdd(true)}>+</li>
            </ul>
            <AddLink 
            subpage={subpage}
            pageId={pageId}
            display={displayAdd}
            toggleModal={toggleAdd} />            
        </Fragment>
    )
}

LinksList.propTypes = {
    subpage: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired
}

export default LinksList
