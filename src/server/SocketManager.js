const io = require('./index').io
const { VERIFY_USER, USER_CONNECTED, PRIVATE_MESSAGE, GET_CONNECTED, MESSAGE_RECEIVED, MESSAGE_SENT, CONNECTION_CREATED } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}

module.exports = (socket) => {

    let sendMessageToChatFromUser;

    //verify username
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) })
        }
    })

    socket.on(GET_CONNECTED, () => {
        socket.emit(GET_CONNECTED, connectedUsers)
    })

    //user connects with username
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user

        sendMessageToChatFromUser = sendMessageToChat(user.name)

        io.emit(USER_CONNECTED, connectedUsers)
    })


    socket.on(CONNECTION_CREATED, (connection) => {
        const { sender, receiver } = connection
        const newChat = createChat({ name: `${sender.name}&${receiver.name}`, users: [sender, receiver] })
        const receiverSocket = receiver.socketId
        socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
        socket.emit(PRIVATE_MESSAGE, newChat)
    })

    socket.on(MESSAGE_SENT, ({ chatId, message }) => {
        sendMessageToChatFromUser(chatId, message)
    })
}

function sendMessageToChat(sender) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({ message, sender }))
    }
}

function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function isUser(userList, userName) {
    return userName in userList
}

