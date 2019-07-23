import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import Chat from './components/Chat';
import UsersList from './components/UsersList'
import './App.css'
import io from 'socket.io-client';
import { USER_CONNECTED, PRIVATE_MESSAGE, GET_CONNECTED, CONNECTION_CREATED } from './Events'
import values from "lodash.values";

const socketURL = "http://localhost:3001/"
function App() {

  const [socket, setSocket] = useState(null)
  const [loggedInUsers, setLoggedInUsers] = useState([])
  const [user, setUser] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const [inChat, setInChat] = useState(false)

  useEffect(() => {
    initSocket()
  }, [])


  const initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', () => {

      socket.on(GET_CONNECTED, (users) => {
        setLoggedInUsers(values(users))
      })

      socket.on(USER_CONNECTED, (users) => {
        setLoggedInUsers(values(users))
      })

      socket.on(PRIVATE_MESSAGE, (chat) => {
        console.log(chat);

      })
    })

    setSocket(socket)
  }



  const setUserFromLogin = (user) => {
    socket.emit(USER_CONNECTED, user)
    setUser(user)
  }

  const setRecieverFromList = (receiver) => {
    setReceiver(receiver)
    socket.emit(CONNECTION_CREATED, { receiver, sender: user })
  }


  return (
    <div id="app">
      <div id="users_container">
        {
          !user ?
            <LoginForm socket={socket} setUserFromLogin={setUserFromLogin} />
            :
            <>
              <h2 className="welcome-message">Welcome {user.name}</h2>
              <UsersList user={user} loggedInUsers={loggedInUsers} sendPrivateChat={setRecieverFromList} />
            </>
        }
      </div>
      <Board />
      {
        user && inChat ?
          <Chat socket={socket} />
          : null
      }
    </div>
  );
}

export default App;
