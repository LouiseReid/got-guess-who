import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import Chat from './components/Chat';
import UsersList from './components/UsersList'
import './App.css'
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from './Events'
import values from "lodash.values";

const socketURL = "http://localhost:3001/"
function App() {

  const [socket, setSocket] = useState(null)
  const [loggedInUsers, setLoggedInUsers] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    initSocket()
  }, [])

  const initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', () => {
      console.log('connected');

      socket.on(USER_CONNECTED, (users) => {
        setLoggedInUsers(values(users))
      })

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
    <div id="app">
      <div id="users_container">
        {
          !user ?
            <LoginForm socket={socket} setUserFromLogin={setUserFromLogin} />
            :
            <h2 className="welcome-message">Welcome {user.name}</h2>
        }
        <UsersList socket={socket} loggedInUsers={loggedInUsers} />
      </div>
      <Board />
      {
        user ?
          <Chat socket={socket} user={user} logout={logout} />
          : null
      }
    </div>
  );
}

export default App;
