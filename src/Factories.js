const uuid4 = require('uuid/v4')

const createUser = ({ name = " ", socketId = null, inChat = false } = {}) => {
    return ({
        id: uuid4(),
        name,
        socketId,
        inChat
    });
}

const createMessage = ({ message, user } = {}) => (
    {
        id: uuid4(),
        time: getTime(new Date(Date.now())),
        message,
        user: user.name
    }
)

const createChat = ({ messages = [], name = "", users = [] } = {}) => (
    {
        id: uuid4(),
        name,
        messages,
        users
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