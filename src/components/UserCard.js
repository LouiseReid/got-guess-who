import React, { useState } from 'react';
import '../styles/UserCard.css'

const UserCard = ({ user }) => {

    const [active, setActive] = useState(true)

    const userStatus = active ? 'available' : 'unavailable'

    return (
        <div className="user-card">
            <div className="user-card__name">{user.name}</div>
            <div className={`user-card__user-${userStatus}`}></div>
        </div>
    )

}

export default UserCard