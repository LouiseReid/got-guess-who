import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import Chat from './components/Chat';
import UsersList from './components/UsersList'
import './App.css'
import io from 'socket.io-client';
import { USER_CONNECTED, PRIVATE_MESSAGE, CONNECTION_CREATED, USER_DISCONNECTED, OTHER_PLAYER_LEFT, USER_LEFT, GET_USERS } from './Events'
import values from "lodash.values";

const socketURL = "http://localhost:3001/"
function App() {

  const [socket, setSocket] = useState(null)
  const [loggedInUsers, setLoggedInUsers] = useState([])
  const [user, setUser] = useState(null)
  const [chat, setChat] = useState(null)
  const [inChat, setInChat] = useState(false)

  useEffect(() => {
    initSocket()
  }, [])


  const initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', () => {

      socket.on(USER_CONNECTED, (users) => {
        setLoggedInUsers(values(users))
      })

      socket.on(GET_USERS, (users) => {
        console.log(users);

        setLoggedInUsers(values(users))
      })

      socket.on(USER_DISCONNECTED, (users) => {
        setLoggedInUsers(values(users))
      })

      socket.on(PRIVATE_MESSAGE, (data) => {
        setLoggedInUsers(data.connectedUsers)
        setChat(data.newChat)
        setInChat(true)
      })

      socket.on(OTHER_PLAYER_LEFT, (users) => {
        alert("Your oppenent has left the game")
        setLoggedInUsers(values(users))
        setChat(null)
        setInChat(false)
      })
    })

    setSocket(socket)
  }

  const setUserFromLogin = (user) => {
    socket.emit(USER_CONNECTED, user)
    setUser(user)
  }

  const setRecieverFromList = (receiver) => {
    setInChat(true)
    socket.emit(CONNECTION_CREATED, { receiver, sender: user })
  }

  const resetChat = () => {
    setInChat(false)
    socket.emit(USER_LEFT, chat)
    setChat(null)
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
          <Chat socket={socket} chat={chat} user={user} resetChat={resetChat} />
          : null
      }
    </div>
  );
}

export default App;
