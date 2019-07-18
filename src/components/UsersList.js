import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { USER_CONNECTED, LOGOUT } from '../Events';
import io from 'socket.io-client';
import '../styles/UsersList.css';

const socketURL = "http://localhost:3001/"
const UsersList = () => {

    const [socket, setSocket] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        initSocket()
    }, [])

    const initSocket = () => {
        const socket = io(socketURL)
        socket.on('connect', () => {
            console.log('connected');

        })
        setSocket(socket)
    }

    const setUserFromLogin = (user) => {
        socket.emit(USER_CONNECTED, user)
        setUser(user)
    }

    const logout = () => {
        socket.emit(LOGOUT)
        setUser(null)
    }

    return (
        <div id="user-list__container">
            <LoginForm socket={socket} setUserFromLogin={setUserFromLogin} />
            <h2 className="header--medium">Players Online</h2>
            <span>Select a player to play with</span>
            <div id="user-list">

            </div>
        </div>
    )
}

export default UsersList