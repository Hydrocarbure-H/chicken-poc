console.log(localStorage.getItem("token"));

const json_response_type = {
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

// handle_right_click();

add_new_mp();

// function are_opened_mp() {
//     const opened_mp = document.querySelectorAll('.messages_container_item');
//     // Display 
//     if (opened_mp === null) {
//         const empty_mp = document.querySelector(".messages_container p");
//         empty_mp.style.display = "block";
//     }
//     else {
//         const empty_mp = document.querySelector(".messages_container p");
//         empty_mp.style.display = "none";
//     }
// }

function add_new_mp() {
    const boxes = document.querySelectorAll('.mp_item');
    // Check if this is necessary to display the nothing message

    boxes.forEach(box => {
        box.addEventListener('click', function handleClick(event) {

            if (document.getElementById("last_messages_container_item")) {
                var last_item = document.getElementById("last_messages_container_item");
                last_item.removeAttribute("id");
            }
            // const empty_mp = document.querySelector(".messages_container p");
            // empty_mp.style.display = "none";
            // -- Creating new mp div -- //
            var mp_box = document.createElement('div');
            mp_box.classList.add('messages_container_item');
            // Adding the header
            adding_mp_header(mp_box, json_response_type);
            // Adding all messages
            adding_mp_messages(mp_box, json_response_type);
            // Adding the writing zone
            adding_mp_writing_zone(mp_box, json_response_type);
            // Set the attribute to the last message box, to avoid margins problems
            mp_box.setAttribute('id', 'last_messages_container_item');
            // Append the mp_div to the last_messages_container
            document.getElementById("messages_container").appendChild(mp_box);
        });
    });

}

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


// function enable_horizontal_scroll() {
//     const scrollContainer = document.querySelector(".servers_container");
//     scrollContainer.addEventListener("wheel", (evt) => {
//         evt.preventDefault();
//         scrollContainer.scrollLeft += evt.deltaY;
//     });
// }


