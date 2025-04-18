import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const socket =io('http://localhost:8001');
 const form=document.getElementById('send-container');
 const messageInput=document.getElementById('messageInp')
 const messageContainer =document.querySelector(".container")
const append =(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop =messageContainer.scrollHeight;
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    console.log("Sending message:",message); 
    append(`YOu: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value ='';

});
const name =prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on("receive", (data) => {
    append(`${data.name}: ${data.message}`, "left");
});