const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const formatMessage = require('./utils/message')
const { joinUsers, findUser } = require('./utils/users')

app.use(express.static('public'))

io.on('connection', (socket => {
    console.log('New connection')

    socket.on('join', (data => {
        let user = joinUsers(data.name, data.room, socket.id)

        // user joining to a room
        socket.join(`${user.room}`)

        // emiting message to all users in room except to sender to welcome new user
        socket.to(`${user.room}`).emit('welcome', formatMessage('Chat Bot', `${user.name} has joined a chat in room ${user.room} `))



        // emitting message to individual user to welcome them
        io.to(socket.id).emit('personal-welcome', formatMessage('Chat Bot', `${user.name}. You have sucessfully joined the chat`))


    }))
    // when user has left
    socket.on('leaveroom', () => {
        let user = findUser(socket.id)
        socket.leave(`${user.room}`)
        socket.to(`${user.room}`).emit('leave', formatMessage('Chat Bot', `${user.name} has left a chat from room ${user.room} `))
    })


    socket.on('chat-message', (data => {
        let user = findUser(socket.id)
        socket.to(`${user.room}`).emit('chat', formatMessage(`${user.name}`, data))
        io.to(socket.id).emit('self-message', formatMessage('You', data, true))
    }))

   


}))

const PORT = process.env.PORT || 4000


http.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)

})


