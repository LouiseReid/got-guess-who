const io = require('./index').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT, PRIVATE_MESSAGE } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}

module.exports = (socket) => {

    //verify username
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) })
        }
    })

    //user connects with username
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user

        io.emit(USER_CONNECTED, connectedUsers)
    })

    socket.on(PRIVATE_MESSAGE, ({ receiver, sender }) => {
        if (receiver in connectedUsers) {
            const newChat = createChat({ name: `${sender}&${receiver}`, users: [sender, receiver] })
            const recieverSocket = connectedUsers[receiver].socketId
            socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
            socket.emit(PRIVATE_MESSAGE, newChat)
        }
    })

}

function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function removeUser(userList, userName) {
    let newList = Object.assign({}, userList)
    delete newList[userName]
    return newList
}


function isUser(userList, userName) {
    return userName in userList
}

