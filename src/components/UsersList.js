import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/UsersList.css'

const socketURL = "http://172.19.59.207:3001/"
const UsersList = () => {

    const [socket, setSocket] = useState(null)

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

    return (
        <div id="user-list__container">
            <h2 className="header--medium">Players Online</h2>
            <span>Select a player to play with</span>
            <div id="user-list">

            </div>
        </div>
    )
}

export default UsersList