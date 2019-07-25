const io = require('./index').io
const { VERIFY_USER, USER_CONNECTED, PRIVATE_MESSAGE, MESSAGE_RECEIVED, MESSAGE_SENT, CONNECTION_CREATED, USER_DISCONNECTED, OTHER_PLAYER_LEFT, USER_LEFT } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}

module.exports = (socket) => {


    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)

            io.emit(USER_DISCONNECTED, connectedUsers)
        }
    })


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
        console.log(connectedUsers);

        io.emit(USER_CONNECTED, connectedUsers)
    })

    socket.on(CONNECTION_CREATED, (connection) => {
        const { sender, receiver } = connection
        const newChat = createChat({ name: `${sender.name} & ${receiver.name}`, users: [sender, receiver] })
        connectedUsers = newChat.users
        const receiverSocket = receiver.socketId
        socket.to(receiverSocket).emit(PRIVATE_MESSAGE, { newChat, connectedUsers })
        socket.emit(PRIVATE_MESSAGE, { newChat, connectedUsers })
    })

    socket.on(MESSAGE_SENT, ({ chat, message, user }) => {
        const newMessage = createMessage({ message, user })
        const users = chat.users
        users.forEach(usr => {
            if (usr.id !== user.id) {
                socket.to(usr.socketId).emit(MESSAGE_RECEIVED, newMessage)
            } else {
                socket.emit(MESSAGE_RECEIVED, newMessage)
            }
        });
    })

    socket.on(USER_LEFT, (chat) => {
        const users = chat.users
        users.forEach(user => {
            if (user.id !== socket.user.id) {
                socket.to(user.socketId).emit(OTHER_PLAYER_LEFT)
            }
        })
    })
}

function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function isUser(userList, userName) {
    return userName in userList
}

function removeUser(userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

