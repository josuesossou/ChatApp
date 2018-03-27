const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user');

    socket.broadcast.emit('newJoinedUser', generateMessage("Admin","New User Joined"));
    socket.emit("newUser", generateMessage("Admin","Welcome to chat room"));

    socket.on('createMessage', (message)=>{
        console.log('new message to send', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
    })

    socket.on('disconnect', ()=>{
        console.log('Client disconnect from the server')
    })
})

server.listen(port, () => {
    console.log(`server up on port ${port}`)
})