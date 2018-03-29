const socket = io();



socket.on('connect', ()=>{
    console.log('connected to the server')
});

socket.on('newMessage', (message)=>{
    let formattedDate = moment().format('H:mm a');
    let template = $('#message-template').html();
    const html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        completedAt: formattedDate
    })

    $('#messages').append(html);
});

socket.on('locationMessage', function(location){
    let formattedDate = moment().format('H:mm a');
    let template = $('#location-template').html();
    const html = Mustache.render(template, {
        from:location.from,
        url:location.url,
        completedAt: formattedDate
    })

    $('#messages').append(html);
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

