

let socket = new WebSocket("ws://192.168.1.182:9002/login");
let connected = false;


var notification_message = "";

setTimeout(function() 
{
    if (connected == false) 
    {
        display_bar_message("Server disconnected");
    }
}, 10000);

socket.onopen = function(e) {
    connected = true;
    display_bar_message("Connected");
};


socket.onmessage = function(e){
    try 
    {
        json = JSON.parse(e.data);
    } 
    catch(e) 
    {
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
                manage_display_notification("display", "You have been disconnected");
                display_bar_message("Server disconnected");
                connected = false;
                break;

            default:
                break;
        }
    }
}

document.getElementById("submit_form").addEventListener("click", login);
document.getElementById("bar_notif_icon").onclick = () => 
{
    manage_display_notification("click", "");
};

function login_process(login_data)
{
        // Success to authentificate
        var token = login_data.token;
        // Save token in local storage
        localStorage.setItem("token", token);
        // Redirect to home page
        window.location.href = "home.html";
}

function login()
{
    // Check server connection
    if (connected == false)
    {
        manage_display_error("display", "Server disconnected");
        // Recreate the connection with socket
        return;
    }

    // Check username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "")
    {
        manage_display_error("display", "Missing fields !");
        return;
    }
    else
    {
        // Clear error message
        manage_display_error("hide", "");
        // Prepare data
        var query = new Query(QueryType.Login, QueryStatus.Success, null, {
            username: document.getElementById("username").value, 
            password: document.getElementById("password").value
        });
        // hashed_password: (CryptoJS.SHA256(document.getElementById("password").value)).toString()
        // Send data
        socket.send(JSON.stringify(query));
    }
}

function manage_display_error(method, error)
{
    if (method == "display")
    {
        document.getElementById("bar_notif_icon").style.display = "block";
        document.getElementById("error_field").style.display = "block";
        document.getElementById("error_field").innerHTML = error;
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
        manage_display_notification("hide", "");
    }
    else if (method == "display")
    {
        notification_message = message;
        document.getElementById("bar_notif_icon").style.display = "block";
    }
    else if (method == "hide")
    {
        notification_message = "";
        document.getElementById("bar_notif_icon").style.display = "none";
    }
}



/**
 * TO DO :
 * faire fonction de création de socket
 * Faire une énumération pour les methodes
 * Faire des tests
 */