import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { USER_CONNECTED, LOGOUT } from '../Events';
import '../styles/UsersList.css';

const socketURL = "http://localhost:3001/"
const UsersList = ({ socket }) => {

    const [user, setUser] = useState(null)

    const setUserFromLogin = (user) => {
        socket.emit(USER_CONNECTED, user)
        setUser(user)
    }

    return (
        <div id="user-list__container">
            {
                !user ?
                    <LoginForm socket={socket} setUserFromLogin={setUserFromLogin} />
                    :
                    <h2 className="welcome-message">Welcome {user.name}</h2>
            }
            <h2 className="header--medium">Players Online</h2>
            <span>Select a player to play with</span>
            <div id="user-list">

            </div>
        </div>
    )
}

export default UsersList