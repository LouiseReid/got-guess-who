import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Chat from './components/Chat';
import UsersList from './components/UsersList'
import './App.css'
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from './Events'

const socketURL = "http://localhost:3001/"
function App() {

  const [socket, setSocket] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    initSocket()
  }, [])

  const initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', () => {
      console.log('connected');

      socket.on(USER_CONNECTED, (user) => {
        setLoggedInUser(user)
      })

    })
    setSocket(socket)
  }

  const logout = () => {
    socket.emit(LOGOUT)
    setLoggedInUser(null)
  }

  return (
    <div id="app">
      <UsersList socket={socket} />
      <Board />
      {
        loggedInUser ?
          <Chat socket={socket} user={loggedInUser} logout={logout} />
          : null
      }
    </div>
  );
}

export default App;
