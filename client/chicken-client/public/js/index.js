
let socket = new WebSocket("ws://192.168.1.97:9002");
let connected = false;

// Display message if the server is not connected
setTimeout(function() 
{
    if (connected == false) 
    {
        var title = document.getElementById("title");
        title.innerHTML = "Seveur déconnecté";
    }
}, 10000);

socket.onopen = function(e) 
{
    connected = true;
    var title = document.getElementById("title");
    title.innerHTML = "Connecté";
    socket.send("The chicken is running...");
};
