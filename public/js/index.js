const socket = io();

let user = '';
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: 'Ingrese su email',
    input: 'email',
    inputLabel: 'Ingrese su email',
    inputPlaceholder: 'Ingrese su email',
    inputValidator: (value) => {
        return !value.includes('@') && "Complete el email para poder continuar.";
    },
    allowOutsideClick: false
}).then((result) => { user = result.value });

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
});

socket.on('messageLogs', messageCollection => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    messageCollection.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`;
    });
    log.innerHTML = messages;
});

