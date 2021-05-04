import React from 'react'
import AddAnc from './AddAnc/AddAnc'
import Groups from './Groups/Groups'

function TopBar() {
    return (
        <div className="top-bar">
            <AddAnc />
            <Groups />
        </div>
    )
}

export default TopBar
