import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import { MESSAGE_SENT, MESSAGE_RECEIVED, PRIVATE_MESSAGE } from '../Events'
import '../styles/Chat.css'

const Chat = ({ socket }) => {


    const [messages, setMessages] = useState([])

    const sendMessage = (chatId, message) => {
        const newMessages = [...messages, message]
        setMessages(newMessages)
        socket.emit(MESSAGE_SENT, { chatId, message })
    }

    return (
        <div id="chat__container">
            <MessageInput sendMessage={sendMessage} />
        </div>
    )

}

export default Chat