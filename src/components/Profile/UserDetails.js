import React from 'react';
import { useSelector } from 'react-redux';
import UserBasicData from './user-details/UserBasicData';
import { selectUser } from '../../redux/selectors/auth';

function UserDetails() {
    const user = useSelector(selectUser)

    return (
        <div>
            <UserBasicData
            user={user} />
        </div>
    )
}

export default UserDetails
