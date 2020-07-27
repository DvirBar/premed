import React from 'react';
import PropTypes from 'prop-types';
import AncItem from './AncItem'

function AncList(props) {
    const ancs = props.ancs;
    const groups = props.groups;
    const loadAncs = props.loadAncs;
    const loadGroups = props.loadGroups;

    if(loadAncs || loadGroups) {
        return <p>Loading...</p>;
    }

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
    groups: PropTypes.array.isRequired,
    loadAncs: PropTypes.bool.isRequired,
    loadGroups: PropTypes.bool.isRequired
}

export default AncList
