import React from 'react';


const MessageContainer = ({ messages }) => {

    return (
        <div>
            {
                messages.map(message => (
                    <li>{message.message}</li>
                ))
            }
        </div>

    )

}

export default MessageContainer