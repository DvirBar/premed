import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../../../redux/actions/auth'

function Logout() {
    const dispatch = useDispatch()
    
    const commitLogout = () => {
        dispatch(logout())
    }
    return (
        <li 
        onClick={commitLogout}
        className="side-bar__logout">
            התנתקות
        </li>
    )
}

export default Logout
