import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../../../redux/actions/auth'
import LogoutIcon from '../../../../../common/icons/Logout/Logout'

function Logout() {
    const dispatch = useDispatch()
    
    const commitLogout = () => {
        dispatch(logout())
    }
    return (
        <div 
        onClick={commitLogout}
        className="side-bar__logout">
            <LogoutIcon 
            height="3rem"
            width="3rem"
            color="#888" />
            <span>
                התנתקות 
            </span>
        </div>
    )
}

export default Logout
