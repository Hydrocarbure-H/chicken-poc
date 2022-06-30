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


// enable_horizontal_scroll();

handle_right_click();

add_new_mp();

function add_new_mp() {
    const boxes = document.querySelectorAll('.mp_item');
    boxes.forEach(box => {
        box.addEventListener('click', function handleClick(event) {

            // Maybe useless.
            // Check if there is the las div displayed
            // Used in previous code but not right now
            if (document.getElementById("last_messages_container_item")) {
                var last_item = document.getElementById("last_messages_container_item");
                last_item.removeAttribute("id");
            }

            // -- Creating new mp div -- //
            const mp_box = document.createElement('div');
            mp_box.classList.add('messages_container_item');
            // Must be filled by the mp json content

            mp_box.innerHTML = "Test";
            // Useless, see before
            mp_box.setAttribute('id', 'last_messages_container_item');

            // Create a close button to close the new mp div
            const mp_close = document.createElement('div');
            mp_close.innerHTML = "Close";
            // Adding listenner to close the mp_div
            mp_close.addEventListener('click', function handleClick(event) {
                mp_box.remove();
            });

            // -- Appending elements -- //
            // Append the close button to the mp_div
            mp_box.appendChild(mp_close);
            // Append the mp_div to the last_messages_container
            document.getElementById("messages_container").appendChild(mp_box);
        });
    });

}


// function enable_horizontal_scroll() {
//     const scrollContainer = document.querySelector(".servers_container");
//     scrollContainer.addEventListener("wheel", (evt) => {
//         evt.preventDefault();
//         scrollContainer.scrollLeft += evt.deltaY;
//     });
// }


