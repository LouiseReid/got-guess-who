import React, { useEffect, useRef } from 'react';
import Message from './Message';
import '../styles/MessageContainer.css'

const MessageContainer = ({ messages, user }) => {

    const messageEndRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ bahaviour: 'smooth' })
    }

    return (
        <div id="message-container">
            {
                messages.map(message => (
                    <Message key={message.id} message={message} user={user} />
                ))
            }
            <div ref={messageEndRef}></div>
        </div>

    )

}

export default MessageContainer