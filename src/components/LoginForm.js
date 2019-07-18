import React, { useState } from 'react';
import { VERIFY_USER } from '../Events'
import '../styles/LoginForm.css'

const LoginForm = ({ socket, setUserFromLogin }) => {

    const [nickName, setnickName] = useState("")
    const [error, setError] = useState(null)


    const setUser = ({ user, isUser }) => {
        console.log(user, isUser);

        if (isUser) {
            setError("Username taken")
        } else {
            setUserFromLogin(user)
            setError(null)
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        socket.emit(VERIFY_USER, nickName, setUser)
        setnickName("")
    }

    const handleChange = (evt) => {
        setnickName(evt.target.value)
    }

    return (
        <div className="login__container">
            <form onSubmit={handleSubmit} className="login__form">
                <label htmlFor="nickName">
                    <h2>Enter Username:</h2>
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="eg GOTGeek101"
                    id="nickName"
                    value={nickName}
                />
                <div className="error">{error ? error : null}</div>
            </form>
        </div>
    )
}

export default LoginForm