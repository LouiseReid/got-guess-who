import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';
import { MESSAGE_SENT, MESSAGE_RECEIVED } from '../Events'
import '../styles/Chat.css'

const Chat = ({ socket, chat, user, resetChat }) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on(MESSAGE_RECEIVED, (message) => {
            addMessage(message)
        })

        return (() => {
            socket.removeAllListeners(MESSAGE_RECEIVED)
        })
        // eslint-disable-next-line
    }, [messages])

    const addMessage = (message) => {
        const newMessages = [...messages, message]
        setMessages(newMessages)
    }

    const sendMessage = (message) => {
        socket.emit(MESSAGE_SENT, { chat, message, user })
    }

    return (
        <div id="chat__container">
            {chat ? <h2 id="chat-header">{chat.name}</h2> : null}
            <MessageContainer messages={messages} user={user} />
            <MessageInput sendMessage={sendMessage} />
            <button id="leave-game" onClick={() => resetChat()}>Leave Game</button>
        </div>
    )

}

export default Chat