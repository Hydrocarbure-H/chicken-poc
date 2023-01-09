// console.log(localStorage.getItem("token"));

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

// Display the mp list
display_mp_list(json_response_mp_type);

// Prepare all mp click listeners
add_mp_click_listener(json_respnse_messages_type);

// Display the server list
display_srv_list(json_response_servers_type);

// Open the last mp, to have a non-empty page at lauch
open_last_mp();

/**
 * @brief Listen for api connection success signal
 */
socket.on('api_connected', function () {
    // console.log("JS : Connected to the API !");
    // add_listeners(socket);
    connected = true;
    display_message(ApiConnectionStatus.Connected, "success");
});


/**
 * @brief This function will open the last message sent or receveid
 * Currently open the first mp
 */
function open_last_mp() {
    document.querySelectorAll('.mp_item')[0].click();
    scrollToBottom(document.getElementById("messages_container_list"));
}