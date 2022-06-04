let socket = new WebSocket("ws://192.168.1.182:9002/login");
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


socket.onopen = function(e) {
    connected = true;
    var title = document.getElementById("title");
    title.innerHTML = "Connecté";
};

socket.onmessage = function(e){
    alert(`[message] Data received from server: ${e.data}`);
    // var response = JSON.parse(e.data);
    // if (response.type == QueryType.Login)
    // {
    //     if (response.status == QueryStatus.Success)
    //     {
    //         // Success to authentificate
    //         // Redirect to the home page
    //     }
    //     else
    //     {
    //         // Failed to authentificate
    //     }
    // }
    //console.log(response);
}