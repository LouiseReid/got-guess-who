import React, { useState } from 'react';

const UserCard = ({ user }) => {

    const [active, setActive] = useState(false)

    return (
        <div className="user-card">
            <div className="user-card__name">{user.name}</div>
        </div>
    )

}

export default UserCard