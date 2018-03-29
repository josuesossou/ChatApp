const socket = io();



socket.on('connect', ()=>{
    console.log('connected to the server')
});

socket.on('newMessage', (message)=>{
    let formattedDate = moment().format('H:mm a');
    let li = $('<li></li>');
    li.text(`from ${message.from} ${formattedDate}: ${message.text}`)
    $('#messages').append(li);
});

socket.on('locationMessage', function(location){
    let formattedDate = moment().format('H:mm a');
    let li = $('<li></li>');
    let a = $('<a target="_blank">User Location</a>');

    li.text(`from ${location.from} ${formattedDate}: `);
    a.attr('href',location.url);
    li.append(a);

    $('#messages').append(li);
})



$("#messageForm").submit(function(e){
    e.preventDefault();
    let inputMessage = $("[name=message]").val();

    if(inputMessage == '') return;

    socket.emit("createMessage", {
       from: "User",
       text: inputMessage
    }, function(){});

    $("[name=message]").val("");
})

$("#location").click(function(){

    $('#location').attr('disabled', 'disabled')

    if (!navigator.geolocation){
        return alert("This browser's old, doesn't support geolocation")
        $('#location').removeAttr('disabled')
    }

    navigator.geolocation.getCurrentPosition(position =>{
        socket.emit('createLocation', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, function(k){
            $('#location').removeAttr('disabled')
        })

    }, err=>{
        alert("Unable to get location")
        $('#location').removeAttr('disabled')
    })
})

socket.on('disconnect', ()=>{
    console.log('disconnected from the server')
})

