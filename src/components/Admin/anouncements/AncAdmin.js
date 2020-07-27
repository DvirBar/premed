import React from 'react';
import AncList from './AncList';
import AddAnc from './AddAnc';
import ManageGroups from './ManageGroups';

function AncAdmin() {
    return (
        <div className="anc-admin">
            <p className="header">
                <AddAnc />
                <ManageGroups />
            </p>
            <AncList />
        </div>
    )
}

export default AncAdmin
