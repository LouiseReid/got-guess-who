import React, { useState } from 'react';
import '../styles/MessageInput.css'

const MessageInput = ({ sendMessage }) => {

    const [message, setMessage] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault()
        sendMessageFromInput()
        setMessage("")
    }

    const handleChange = (evt) => {
        setMessage(evt.target.value)
    }

    const sendMessageFromInput = () => {
        sendMessage(message)
    }

    return (
        <div id="message-input">
            <form onSubmit={handleSubmit} id="message-form">
                <input
                    id="message"
                    value={message}
                    type="text"
                    placeholder="eg is he a bastard?"
                    onChange={handleChange}
                />
                <button
                    disabled={message.length < 1}
                    type="submit"
                    className="btn guess-btn"
                >Guess</button>
            </form>
        </div>
    )
}

export default MessageInput