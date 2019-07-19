import React, { useState, useEffect } from 'react';
import { USER_CONNECTED, LOGOUT } from '../Events';
import '../styles/UsersList.css';

const UsersList = ({ socket, loggedInUsers }) => {


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