const socket = io()
console.log(location.search)

let { name, room } = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

name = name.split(' ')[0]

if(name == null || name.length === 0 || room == null || room.length === 0){
    console.log('')
    
    window.location.href= 'index.html'
}

socket.emit('join',{name,room})

// chat message implementation
const charForm = document.querySelector('.chat-form')
const chat = document.querySelector('.chat')
const messageBox = document.querySelector('.msg-box')
const chatMessages = document.querySelector('.msg-container')
const leaveRoom = document.querySelector('.leave-room')





charForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    socket.emit('chat-message',chat.value)
    chat.value = ''
    chat.focus()

})

// receiving welcome message and displaying in to all user when a new user connects
socket.on('welcome',(data=>{
    showChatMessage(data)

}))

// receiving a personal welcome message and displaying it to a user itself

socket.on('personal-welcome',(data=>{
   showChatMessage(data)

}))

socket.on('chat',(data=>{
    showChatMessage(data)

}))
socket.on('self-message',(data=>{
    showChatMessage(data)
}

))
socket.on('leave',(data=>{
    showChatMessage(data)
}

))

leaveRoom.addEventListener('click',()=>{
    socket.emit('leaveroom')
})

function showChatMessage(data){
    let messageContainer = document.createElement('div')
    messageContainer.setAttribute('class','msg-container')
    if(data.self){
        messageContainer.classList.add('right-align')
    }
    let str = `<h4>${data.name}</h4>
    <div class="msg-text-time">
        <h5>${data.text}</h5>
        <div class="timestr">:
            <span>${data.time}</span>
        </div>
    </div>
    `
    messageContainer.innerHTML = str
    messageBox.appendChild(messageContainer)

    // scroll down
messageBox.scrollTop = messageBox.scrollHeight
}





