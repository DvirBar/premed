import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../../redux/selectors/auth'
import Profile from '../../../../../common/icons/Profile/Profile'
import SideBarItem from './SideBarItem/SideBarItem'

function SideBarLinks() {
    let links = [
        {
            name: "פרופיל",
            url: '/profile',
            icon: ({ outlined }) => 
                <Profile
                color="#486974"
                width="2.5rem"
                height="2.5rem"
                outlined={outlined} />     
        },
        {
            name: 'קנייה/מכירה',
            isUpcoming: true,
        },
        {
            name: 'בלוג',
            isUpcoming: true,
        } 
    ]

    const user = useSelector(selectUser)

    if(user.isAdmin) {
        links.push({
            name: "ניהול",
            url: '/admin',
            color: "#486974"
        })
    }
    
    return (
        <ul className="side-bar__links">
            {links.map(link =>
                <SideBarItem
                link={link} />
            )}
        </ul>
    )
}

export default SideBarLinks
