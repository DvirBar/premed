import React from 'react';
import PropTypes from 'prop-types';
import AncItem from './AncItem'

function AncList({ ancs, groups }) {
    return (
        <div>
            <div className="anclist-admin">
                {ancs.map(anc => (
                    <AncItem
                    key={anc._id}
                    anc={anc}
                    groups={groups}
                    />
                ))}
            </div>
        </div>
    )
}

AncList.propTypes = {
    ancs: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
}

export default AncList
