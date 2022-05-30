
let socket = new WebSocket("ws://192.168.1.97:9002");
console.log(socket);

socket.onopen = function(e) 
{
    var title = document.getElementById("title");
    title.innerHTML = "Connected to the server !!";
    socket.send("The chicken is running...");
};
