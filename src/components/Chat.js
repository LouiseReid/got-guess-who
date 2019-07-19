import React, { useState } from 'react'
import '../styles/Chat.css'

const Chat = ({ socket, user, logout }) => {

    const [activeChat, setActiveChat] = useState(null)

    return (
        <div id="chat__container">
            Chat container
        </div>
    )

}

export default Chat