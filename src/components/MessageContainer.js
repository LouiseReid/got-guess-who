import React from 'react';
import '../styles/MessageContainer.css'


const MessageContainer = ({ messages }) => {

    return (
        <div id="message-container">
            {
                messages.map(message => (
                    <li key={message.id}>{message.message}</li>
                ))
            }
        </div>

    )

}

export default MessageContainer