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

// Display the mp list
display_mp_list();

// Prepare all mp click listeners
add_mp_click_listener();

// Display the server list
display_srv_list();

// Open the last mp, to have a non-empty page at lauch
open_last_mp();


/**
 * @brief This function will parse the json response which contains all mp account, and append it to the page
 */
function display_mp_list() {
    /*
    <div class="mp_container">
        <div class="mp_item">
            <img src="../images/design/grey/account.svg" class="mp_item_profile_img" title="TEST">
            <h1 class="mp_item_profile_name">Dorian Turgot Turgot Turgot Turgot Turgot Turgot Turgot</h1>
        </div>
    </div>
    */
    const mp_container = document.createElement("div");
    mp_container.classList.add("mp_container");

    json_response_mp_type.mp_list.forEach(mp => {

        const mp_item = document.createElement("div");
        mp_item.classList.add("mp_item");

        const mp_item_profile_img = document.createElement("img");
        mp_item_profile_img.classList.add("mp_item_profile_img");
        mp_item_profile_img.src = "../images/design/grey/account.svg";
        mp_item_profile_img.title = mp.account_name;

        const mp_item_profile_name = document.createElement("h1");
        mp_item_profile_name.classList.add("mp_item_profile_name");
        mp_item_profile_name.innerHTML = mp.account_name;

        mp_item.appendChild(mp_item_profile_img);
        mp_item.appendChild(mp_item_profile_name);

        mp_container.appendChild(mp_item);
    });

    document.getElementById("left_container").appendChild(mp_container);
}

/**
 * @brief This function will parse the json response which contains all servers attached to the account, and append it to the page
 */
function display_srv_list() {
    /*
    <div class="srv_item">
        <img src="../images/design/grey/server.svg" class="srv_item_profile_img">
    </div>
    */
    const servers_container = document.getElementById("servers_container");
    json_response_servers_type.srv_list.forEach(srv => {
        const srv_item = document.createElement("div");
        srv_item.classList.add("srv_item");

        const srv_item_profile_img = document.createElement("img");
        srv_item_profile_img.classList.add("srv_item_profile_img");
        srv_item_profile_img.src = "../images/design/grey/server.svg";
        srv_item_profile_img.title = srv.server_name;

        srv_item.appendChild(srv_item_profile_img);
        servers_container.appendChild(srv_item);

    });
}

/**
 * @brief This function will open the last message sent or receveid
 * Currently open the first mp
 */
function open_last_mp() {
    document.querySelectorAll('.mp_item')[0].click();
    scrollToBottom(document.getElementById("messages_container_list"));
}

/**
 * @brief This function will add all click listeners on each mp box
 * Each click will create a new div with all mp messages
 */
function add_mp_click_listener() {
    document.querySelectorAll('.mp_item').forEach(box => {
        box.addEventListener('click', function handleClick(event) {

            // Used to avoid margins problem for the last message container item
            if (document.getElementById("last_messages_container_item")) {
                var last_item = document.getElementById("last_messages_container_item");
                last_item.removeAttribute("id");
            }

            // -- Creating new mp div -- //
            var mp_box = document.createElement('div');
            mp_box.classList.add('messages_container_item');
            // Adding the header
            adding_mp_header(mp_box, json_respnse_messages_type);
            // Adding all messages
            adding_mp_messages(mp_box, json_respnse_messages_type);
            // Adding the writing zone
            adding_mp_writing_zone(mp_box, json_respnse_messages_type);
            // Set the attribute to the last message box, to avoid margins problems
            mp_box.setAttribute('id', 'last_messages_container_item');
            // Append the mp_div to the last_messages_container
            document.getElementById("messages_container").appendChild(mp_box);
            // Scroll to the bottom of the read messages container
            scrollToBottom(mp_box.children[1]);
        });
    });

}

/**
 * @brief This function will create the header of the mp (profile and close button)
 * @param {div} obj The created div for opened mp
 * @param {JSON} json The JSON response wich contains all messages
 */
function adding_mp_header(obj, json) {
    /*
    <div class="messages_container_item_header">
        <div class="profile">
            <img src="../images/design/grey/account.svg" class="mp_item_profile_img">
            <h2>Dorian Turgot</h2>
        </div>
        <div class="close_button">
            <img src="../images/design/grey/close.svg">
        </div>
    </div>
    */

    const container_item_header = document.createElement('div');
    container_item_header.classList.add('messages_container_item_header');

    const profile = document.createElement('div');
    profile.classList.add('profile');

    const profile_img = document.createElement('img');
    profile_img.src = "../images/design/grey/account.svg";
    profile_img.classList.add('mp_item_profile_img');

    const profile_name = document.createElement('h2');
    profile_name.innerHTML = "Dorian Turgot";

    profile.appendChild(profile_img);
    profile.appendChild(profile_name);

    const close_button = document.createElement('div');
    close_button.classList.add('close_button');

    const close_button_img = document.createElement('img');
    close_button_img.src = "../images/design/grey/close.svg";
    close_button_img.addEventListener('click', function handleClick(event) {
        obj.remove();
    });

    close_button.appendChild(close_button_img);

    container_item_header.appendChild(profile);
    container_item_header.appendChild(close_button);
    obj.appendChild(container_item_header);
}

/**
 * @brief This function will parse and add all messages which are in the JSON response
 * @param {div} obj The created div for opened mp
 * @param {JSON} json The JSON response wich contains all messages
 */
function adding_mp_messages(obj, json) {
    /*
    <div class="read_messages_container">
        <div class="receveid_message">
            <div class="message">Hi Chicken !</div>
            <div class="date">24/06 - 22:10</div>
        </div>
        <div class="sent_message">
            <div class="message">Hi</div>
            <div class="date">24/06 - 22:10</div>
        </div>
    </div>
    */


    const read_messages_container = document.createElement('div');
    read_messages_container.classList.add('read_messages_container');
    read_messages_container.setAttribute('id', 'messages_container_list');

    // -- Adding all messages -- //
    // browse json
    json.messages_list.forEach(message => {

        if (message.sender === "Thomas Peugnet") {
            const sent_message = document.createElement('div');
            sent_message.classList.add('sent_message');

            const message_div_sent = document.createElement('div');
            message_div_sent.classList.add('message');
            message_div_sent.innerHTML = message.body;

            const date_div_sent = document.createElement('div');
            date_div_sent.classList.add('date');
            date_div_sent.innerHTML = message.date;

            sent_message.appendChild(message_div_sent);
            sent_message.appendChild(date_div_sent);
            read_messages_container.appendChild(sent_message);
        }
        else {
            const receveid_message = document.createElement('div');
            receveid_message.classList.add('receveid_message');

            const message_div = document.createElement('div');
            message_div.classList.add('message');
            message_div.innerHTML = message.body;

            const date_div = document.createElement('div');
            date_div.classList.add('date');
            date_div.innerHTML = message.date;

            receveid_message.appendChild(message_div);
            receveid_message.appendChild(date_div);
            read_messages_container.appendChild(receveid_message);
        }
    });

    obj.appendChild(read_messages_container);

}

/**
 * @brief This function will add the textarea zone at the end of the created div
 * @param {div} obj The created div for opened mp
 * @param {JSON} json The JSON response wich contains all messages
 */
function adding_mp_writing_zone(obj, json) {
    /*
    <div class="write_messages_container">
        <textarea class="message_textarea" placeholder="I am a hot chicken..."></textarea>
    </div>
    */

    const write_messages_container = document.createElement('div');
    write_messages_container.classList.add('write_messages_container');

    const message_textarea = document.createElement('textarea');
    message_textarea.classList.add('message_textarea');
    message_textarea.placeholder = "I am a hot chicken...";

    write_messages_container.appendChild(message_textarea);
    obj.appendChild(write_messages_container);
}
