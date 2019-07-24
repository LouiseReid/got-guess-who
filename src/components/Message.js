import React from 'react';
import '../styles/Message.css'

const Message = ({ message, user }) => {

    return (
        <div className={`message ${message.user === user.name ? 'sender' : 'receiver'}`}>{message.message}</div>
    )

}


export default Message