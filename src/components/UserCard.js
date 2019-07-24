import React from 'react';
import '../styles/UserCard.css'

const UserCard = ({ user, openChat }) => {

    const userStatus = user.inChat ? 'unavailable' : 'available'

    return (
        <div className="user-card" onClick={() => openChat(user)}>
            <div className="user-card__name">{user.name}</div>
            <div className={`user-card__user-${userStatus}`}></div>
        </div>
    )

}

export default UserCard