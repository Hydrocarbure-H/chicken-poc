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


enable_horizontal_scroll();

handle_right_click();

add_new_mp();

function add_new_mp() {
    const boxes = document.querySelectorAll('.mp_item');
    boxes.forEach(box => {
        box.addEventListener('click', function handleClick(event) {
            console.log(box);
            // add messaging box
            var last_item = document.getElementById("last_messages_container_item");
            last_item.removeAttribute("id");

            const mp_box = document.createElement('div');
            mp_box.classList.add('messages_container_item');
            // fill messages_container_item with children from json
            // Create function for it.
            mp_box.innerHTML = "TEst";
            mp_box.setAttribute('id', 'last_messages_container_item');
            document.getElementById("messages_container").appendChild(mp_box);


        });
    });

}


function enable_horizontal_scroll() {
    const scrollContainer = document.querySelector(".servers_container");
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}


