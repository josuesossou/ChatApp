const socket = io();

function scrollToBottom(){
    //Selectors
    let messages = $('#messages');
    let chat = $('.chat-main');
    let childMessages = messages.children('li:last-child');
    //hieghts
    let clientHeight = window.innerHeight;
    let scrollTop = window.pageYOffset;
    let scrollHeight = chat.prop('scrollHeight');
    let childMessagesHeight = childMessages.innerHeight();
    let prevChildHeight = childMessages.prev().innerHeight();

    if((clientHeight + scrollTop + childMessagesHeight + prevChildHeight + 120) >= scrollHeight){
        window.scrollTo(0,scrollHeight)
    }
}

socket.on('connect', ()=>{
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err){
            alert(err);
            window.location.href = "/"
        }else{
            console.log("No error")
        }
    })
});

socket.on('updateUserList', (users)=>{
    let ol = $('<ol></ol>');

    users.forEach(function(user){
        ol.append($('<li></li>').text(user))
    });

    $('#users').html(ol);
})

socket.on('newMessage', (message)=>{
    let formattedDate = moment().format('H:mm a');
    let template = $('#message-template').html();
    const html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        completedAt: formattedDate
    })

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
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

