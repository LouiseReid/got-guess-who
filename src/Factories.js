const uuid4 = require('uuid/v4')

const createUser = ({ name = " ", socketId = null } = {}) => {
    return ({
        id: uuid4(),
        name,
        socketId
    });
}

const createMessage = ({ message = "", sender = "" } = {}) => (
    {
        id: uuid4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

const createChat = ({ messages = [], name = "", users = [] } = {}) => (
    {
        id: uuid4(),
        name,
        messages,
        users,
        typingUsers: []
    }
)

const getTime = (date) => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
}

module.exports = {
    createUser,
    createMessage,
    createChat
}