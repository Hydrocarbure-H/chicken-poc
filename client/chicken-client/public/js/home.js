console.log(localStorage.getItem("token"));

enable_horizontal_scroll();

handle_right_click();

function handle_right_click() {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        alert("Right click test");
    }
        , false);
}


function enable_horizontal_scroll() {
    const scrollContainer = document.querySelector(".servers_container");
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}
