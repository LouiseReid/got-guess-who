import React from 'react';
import '../styles/UsersList.css';
import UserCard from './UserCard';

const UsersList = ({ user, loggedInUsers, sendPrivateChat }) => {

    const openChatWithUser = (reciever) => {
        if (!reciever.inChat) {
            sendPrivateChat(reciever)
        }
    }

    return (
        <div id="user-list__container">
            <h2 className="header--medium">Players Online</h2>
            {
                user ?
                    <span>Select a player to play with</span>
                    :
                    null
            }
            <div id="user-list">
                {
                    user ?
                        loggedInUsers.filter(usr => usr.id !== user.id).map(usr => (
                            <UserCard key={usr.id} user={usr} openChat={openChatWithUser} />
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}

export default UsersList