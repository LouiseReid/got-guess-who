import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';
import { MESSAGE_SENT, MESSAGE_RECEIVED } from '../Events'
import '../styles/Chat.css'

const Chat = ({ socket, chat, user }) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on(MESSAGE_RECEIVED, (message) => {
            addMessage(message)
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
            {chat ? <h1>{chat.name}</h1> : null}
            <MessageContainer messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    )

}

export default Chat