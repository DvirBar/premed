import React from 'react';
import { useSelector } from 'react-redux';
import UserBasicData from '../user-details/UserBasicData/UserBasicData';
import { selectUser } from '../../../redux/selectors/auth';
import AncSubscriptions from '../user-details/AncSubscriptions/AncSubscriptions';
import ListLayout from '../../layout/ListLayout/ListLayout';

function UserDetails() {
    const user = useSelector(selectUser)

    return (
        <ListLayout>
            <UserBasicData
            user={user} />
            <AncSubscriptions />
        </ListLayout>
    )
}

export default UserDetails
