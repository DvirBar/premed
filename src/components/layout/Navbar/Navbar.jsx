import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { selectUser } from '../../../redux/selectors/auth';
import MainLinks from './MainLinks/MainLinks';
import MoreMenu from './MoreMenu/MoreMenu';

function Navbar() {
    const user = useSelector(selectUser)
    const history = useHistory()

    const goToLogin = () => {
        history.push('/login')
    }

    return (
        <ul className="navbar-main">
            <li>
                <Link to="/">
                    <div className='logo'>
                        <img className="logo-color" src={logo} alt='Logo' />
                    </div>
                </Link>
            </li>
            <MainLinks />
            <li className="navbar-main__left-links">
                {user 
                ?   <MoreMenu />
                :   <div
                    className="login-link"
                    onClick={goToLogin}>
                        התחבר
                    </div>
                }
            </li>

           
        </ul>
    )
}

export default Navbar
