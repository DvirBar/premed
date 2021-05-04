import { Close } from '@material-ui/icons'
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
                    
                    <div className="side-bar__top__title">
                        <div 
                        onClick={() => setDisplay(false)}
                        className="side-bar__top__title__close">
                            <Close style={{fontSize: 20}} />
                        </div>
                        <span>
                            {`שלום, ${user.firstName}`}
                        </span>
                    </div>
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
