
let socket = new WebSocket("wss://192.168.1.180:3001");

socket.onopen = function(e) 
{
    alert("Connected to the API");
    var title = document.getElementById("title");
    title.innerHTML = "Connected to the server";
    socket.send("My name is John");
};
