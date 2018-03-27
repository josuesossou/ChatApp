const socket = io();

socket.on('connect', ()=>{
    console.log('connected to the server')
});

socket.on('newMessage', (message)=>{
    console.log('new message arrived', message);
});

socket.on("newJoinedUser", (message) =>{
    console.log(message)
})

socket.on('newUser', (message)=>{
    console.log(message)
})
// socket.emit('createMessage', {
//     from: "Joe",
//     text: "What's up"
// })

socket.on('disconnect', ()=>{
    console.log('disconnected from the server')
});

