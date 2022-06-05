
let socket = new WebSocket("ws://192.168.1.182:9002/login");
let connected = false;

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
    try {
        json = JSON.parse(e.data);
    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }    
    var response = new Response(json.type, json.status, json.error, json.data);
    switch (response.type) {
        case QueryType.Login:
            login_process(response.data);
            break;
        case QueryType.Disconnect:
            alert("serveur déconnecté");
            break;
        default:
            break;
    }

}

function login_process(login_data)
{
    alert(`[message] Data received from server: ${login_data.username}`);
//     if (response.status == QueryStatus.Success)
//     {
//         // Success to authentificate
//         // Redirect to the home page
//     }
//     else
//     {
//         // Failed to authentificate
//         // Display error message
//     }

}

document.getElementById("submit_form").addEventListener("click", send_data);

function send_data()
{
    var query = new Query(QueryType.Login, QueryStatus.Success, null, {
        username: document.getElementById("username").value, 
        hashed_password: document.getElementById("password").value
    });
    socket.send(JSON.stringify(query));
}






// socket.onmessage = function(event) {
//     alert(`[message] Data received from server: ${event.data}`);
//   };

/*
Data sent to the server:
{
    "type": "login",
    "data": {
        username: "",
        hased_password: "",
    }
}

Data received from the server:
{
    "type": "login",
    "data": {
        "status": "success",
        "error": "",
        "token": "",
    }
}
*/