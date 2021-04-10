import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../redux/selectors/auth'
import SideMenu from '../../../SideMenu/SideMenu'
import Logout from './Logout/Logout'
import SideBarLinks from './SideBarLinks/SideBarLinks'

function SideBar({ display, setDisplay }) {
    const user = useSelector(selectUser)

    return (
        <SideMenu
        display={display}
        setDisplay={setDisplay}>
            <div className="side-bar">
                <div className="side-bar__top">
                    <li className="side-bar__top__title">
                        {`שלום, ${user.firstName}`}
                    </li>
                    <SideBarLinks />
                </div>
                <div className="side-bar__bottom">
                    <Logout />
                </div>
            </div>
        </SideMenu>
    )
}

export default SideBar
