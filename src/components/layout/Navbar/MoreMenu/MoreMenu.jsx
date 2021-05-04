import { MoreHoriz } from '@material-ui/icons'
import React, { useState } from 'react'
import useOnUrlChange from '../../../common/hooks/useOnUrlChange'
import SideBar from './SideBar/SideBar'

function MoreMenu() {
    const [display, setDisplay] = useState(false)
    useOnUrlChange(() => setDisplay(false))

    return (
        <div className="more-menu">
            <div 
            onClick={() => setDisplay(true)} 
            className="icon-wrapper">
                <MoreHoriz />
            </div>
            <SideBar 
            display={display}
            setDisplay={setDisplay} />
        </div>
    )
}

export default MoreMenu
