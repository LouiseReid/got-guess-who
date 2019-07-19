import React from 'react';
import '../styles/UsersList.css';
import UserCard from './UserCard';

const UsersList = ({ user, loggedInUsers }) => {



    return (
        <div id="user-list__container">
            <h2 className="header--medium">Players Online</h2>
            <span>Select a player to play with</span>
            <div id="user-list">
                {
                    user ?
                        loggedInUsers.filter(usr => usr.id !== user.id).map(usr => (
                            <UserCard key={usr.id} user={usr} />
                        ))
                        :
                        loggedInUsers.map(usr => (
                            <UserCard key={usr.id} user={usr} />
                        ))
                }
            </div>
        </div>
    )
}

export default UsersList