
let socket = new WebSocket("ws://192.168.1.182:9002/login");
let connected = false;



var notification_message = "";

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
    display_bar_message("Connected");
};


socket.onmessage = function(e){
    try {
        json = JSON.parse(e.data);
    } 
    catch(e) {
        manage_display_notification("display", "JSON PARSE - DEBUG : " + response.error);
    }

    var response = new Response(json.type, json.status, json.error, json.data);

    if (response.status == QueryStatus.Error)
    {
        manage_display_notification("display", "Error : " + response.error);
    }
    else
    {
        switch (response.type) {
            case QueryType.Login:
                login_process(response.data);
                break;
            case QueryType.Disconnect:
                display_error("You have been disconnected");
                display_bar_message("Server disconnected");
                connected = false;
                break;
            default:
                break;
        }
    }
}

document.getElementById("submit_form").addEventListener("click", send_data);
document.getElementById("bar_notif_icon").onclick = () => 
{
    manage_display_notification("click", "");
};

function login_process(login_data)
{
    // if (response.status == QueryStatus.Success)
    // {
    //     // Success to authentificate
    //     // Redirect to the home page
    // }
    // else
    // {
    //     // Failed to authentificate
    //     // Display error message
    //     // display_error("Invalid username or password");
    // }

}

function send_data()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "")
    {
        manage_display_error("display", "There are missing fields");
        return;
    }
    else
    {
        manage_display_error("hide", "");

        var query = new Query(QueryType.Login, QueryStatus.Success, null, {
            username: document.getElementById("username").value, 
            hashed_password: document.getElementById("password").value
        });

        socket.send(JSON.stringify(query));
    }
}

function manage_display_error(method, error)
{
    if (method == "display")
    {
        document.getElementById("bar_notif_icon").style.display = "block";
        document.getElementById("error_field").style.display = "block";
        manage_display_notification("display", error);
    }
    else
    {
        document.getElementById("error_field").style.display = "none";
        manage_display_notification("hide", "");
    }
}

function display_bar_message(message)
{
    var title = document.getElementById("bar_message");
    title.innerHTML = message;
}


function manage_display_notification(method, message)
{
    if (method == "click")
    {
        alert(notification_message);
    }
    else if (method == "display")
    {
        notification_message = message;
        document.getElementById("bar_notif_icon").style.display = "block";
    }
    else
    {
        notification_message = "";
        document.getElementById("bar_notif_icon").style.display = "none";
    }
}



/**
 * TO DO :
 * Hash password before sending it to the server
 * Create the redirection to the home page
 * faire fonction de création de socket
 */