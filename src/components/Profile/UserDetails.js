import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditUser from './EditUser';

function UserDetails() {
    const [user, setUser] = useState({})
    const fetchedUser = useSelector(state => state.auth.user)

    useEffect(() => {
        setUser(fetchedUser)
    }, [fetchedUser])

    return (
        <div>
            <EditUser user={user} />
        </div>
    )
}

export default UserDetails
