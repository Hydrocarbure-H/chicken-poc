// console.log(localStorage.getItem("token"));

const json_respnse_messages_type = {
    messages_list:
        [{
            sender: "Dorian Turgot",
            date: "24/06 - 22:10",
            body: "Hi Chicken !"
        },
        {
            sender: "Dorian Turgot",
            date: "24/06 - 22:10",
            body: "How hot are you ?"
        },
        {
            sender: "Thomas Peugnet",
            date: "24/06 - 22:10",
            body: "Hi"
        },
        {
            sender: "Thomas Peugnet",
            date: "24/06 - 22:10",
            body: "I'm roasting ! That's really fun !"
        },
        {
            sender: "Dorian Turgot",
            date: "24/06 - 22:10",
            body: "Hi Chicken !"
        },
        {
            sender: "Dorian Turgot",
            date: "24/06 - 22:10",
            body: "monsupergrandmotpourdecrireunservicedemessageriequisappellepoulethaha"
        },
        {
            sender: "Thomas Peugnet",
            date: "24/06 - 22:10",
            body: "Hi"
        },
        {
            sender: "Thomas Peugnet",
            date: "24/06 - 22:10",
            body: "I'm roasting ! That's really fun !"
        }
        ]
};

const json_response_mp_type =
{
    mp_list: [
        {
            account_id: "aeecf1",
            account_name: "Dorian Turgot"
        },
        {
            account_id: "aeecf3",
            account_name: "Thimot Veyre"
        },
        {
            account_id: "aeecf2",
            account_name: "Thomas Peugnet"
        },
        {
            account_id: "aeecf1",
            account_name: "Dorian Turgot"
        },
        {
            account_id: "aeecf3",
            account_name: "Thimot Veyre"
        },
        {
            account_id: "aeecf2",
            account_name: "Thomas Peugnet"
        },
        {
            account_id: "aeecf1",
            account_name: "Dorian Turgot"
        },
        {
            account_id: "aeecf3",
            account_name: "Thimot Veyre"
        },
        {
            account_id: "aeecf2",
            account_name: "Thomas Peugnet"
        },
        {
            account_id: "aeecf1",
            account_name: "Dorian Turgot"
        },
        {
            account_id: "aeecf3",
            account_name: "Thimot Veyre"
        },
        {
            account_id: "aeecf2",
            account_name: "Thomas Peugnet"
        },
        {
            account_id: "aeecf1",
            account_name: "Dorian Turgot"
        },
        {
            account_id: "aeecf3",
            account_name: "Thimot Veyre"
        },
        {
            account_id: "aeecf2",
            account_name: "Thomas Peugnet"
        }
    ]
}

const json_response_servers_type =
{
    srv_list: [
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        },
        {
            server_id: "bbb23",
            server_name: "Goat Server"
        }
    ]
}
/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:00:04 pm
 * @copyright Thomas PEUGNET
 */

/**
 * TO DO :
 * Change notification style and structure (using classes)
 */
var connected = false;

// Create socket io connection to the electron app server
var socket = io('http://localhost:3001');
// emit connection signal
socket.emit('connection');

// On load, pull all the messages from the server and create a json
// object with the messages
$(document).ready(function () {
    // Get the messages from the server
    // Display the mp list
    display_mp_list(json_response_mp_type);

    // Prepare all mp click listeners
    add_mp_click_listener(json_respnse_messages_type, socket);

    // Display the server list
    display_srv_list(json_response_servers_type);

    // Open the last mp, to have a non-empty page at lauch
    open_last_mp();
    socket.emit('get_messages', "20b4e3bf-6663-446d-9705-bc8369779d6d");
});


/**
 * @brief Listen for api connection success signal
 */
socket.on('api_connected', function () {
    // console.log("JS : Connected to the API !");
    // add_listeners(socket);
    connected = true;
    display_message(ApiConnectionStatus.Connected, "success");
});


// On message reception, create the json object
socket.on('pull_messages', function (data) {
    // Create a json object with the messages
    var json_messages = adapt_given_json(data);
    // Create the messages list
    pull_messages(json_messages);
});


function adapt_given_json(json) {
    var adapted_json = {};
    var messages_list = [];
    for (var i = 0; i < json.messages.length; i++) {
        var message = {};
        message.sender = json.messages[i].Transmitter;
        message.date = json.messages[i].Date;
        message.body = json.messages[i].Content;
        messages_list.push(message);
    }
    adapted_json = { messages_list };
    return adapted_json;
}

/**
 * @brief This function will open the last message sent or receveid
 * Currently open the first mp
 */
function open_last_mp() {
    document.querySelectorAll('.mp_item')[0].click();
    scrollToBottom(document.getElementById("messages_container_list"));
}