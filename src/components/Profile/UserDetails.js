import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import UserBasicData from './user-details/UserBasicData';
import { selectUser } from '../../redux/selectors/auth';
import AncSubscriptions from './user-details/AncSubscriptions/AncSubscriptions';

function UserDetails() {
    const user = useSelector(selectUser)

    return (
        <Fragment>
            <UserBasicData
            user={user} />
            <AncSubscriptions />
        </Fragment>
    )
}

export default UserDetails
