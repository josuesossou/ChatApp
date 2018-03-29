const socket = io();



socket.on('connect', ()=>{
    console.log('connected to the server')
});

socket.on('newMessage', (message)=>{
    let li = $('<li></li>');
    li.text(`from ${message.from}: ${message.text}`)
    $('#messages').append(li);
});

$("#messageForm").submit(function(e){
    e.preventDefault();

    socket.emit("createMessage", {
       from: "User",
       text: $("[name=message]").val(),
    }, function(){})
})

socket.on('locationMessage', function(location){
    let li = $('<li></li>');
    let a = $('<a target="_blank">User Location</a>');

    li.text(`from ${location.from}: `);
    a.attr('href',location.url);
    li.append(a);

    $('#messages').append(li);
})

$("#location").click(function(){

    if (!navigator.geolocation){
        return alert("This browser's old, doesn't support geolocation")
    }

    navigator.geolocation.getCurrentPosition(position =>{
        socket.emit('createLocation', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, function(k){console.log(k)})

    }, err=>{alert("Unable to get location")})
})

socket.on('disconnect', ()=>{
    console.log('disconnected from the server')
})

