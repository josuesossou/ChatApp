const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

const port = process.env.PORT || 3000

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user');

    socket.on('join', (param, callback)=>{
        if  (!isRealString(param.name) || !isRealString(param.room)){
            return callback("error")
        }

        socket.join(param.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.broadcast.to(param.room).emit('newMessage', generateMessage("Admin",`${param.name} has joined the room.`));
        socket.emit("newMessage", generateMessage("Admin",`welcome to ${param.room} room`));

        callback();
    })

    socket.on('createMessage', (message, callback)=>{
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback();
    })

    socket.on('createLocation', (coord, callback)=>{
        io.emit('locationMessage', generateLocation('User', coord.lat, coord.lng));
        callback('ok');
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    })
})

server.listen(port, () => {
    console.log(`server up on port ${port}`)
})