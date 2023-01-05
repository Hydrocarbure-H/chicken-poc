const userStatus = {
    microphone: false,
    mute: true,
    username: "user#" + Math.floor(Math.random() * 999999),
    online: false,
};

const users = document.getElementById("users");

userStatus.username = "Thomas";
window.onload = (e) => {
    mainFunction(1000);
};

var socket = io("ws://192.168.1.107:5252", { transports: ['websocket'] });
socket.emit("userInformation", userStatus);


function mainFunction(time) {


    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        var madiaRecorder = new MediaRecorder(stream);
        madiaRecorder.start();

        var audioChunks = [];

        madiaRecorder.addEventListener("dataavailable", function (event) {
            audioChunks.push(event.data);
        });

        madiaRecorder.addEventListener("stop", function () {
            var audioBlob = new Blob(audioChunks);

            audioChunks = [];

            var fileReader = new FileReader();
            fileReader.readAsDataURL(audioBlob);
            fileReader.onloadend = function () {
                if (!userStatus.microphone || !userStatus.online) return;

                var base64String = fileReader.result;
                socket.emit("voice", base64String);

            };

            madiaRecorder.start();


            setTimeout(function () {
                madiaRecorder.stop();
            }, time);
        });

        setTimeout(function () {
            madiaRecorder.stop();
        }, time);
    });


    socket.on("send", function (data) {
        var audio = new Audio(data);
        audio.play();
    });

    socket.on("usersUpdate", function (data) {
        users.innerHTML = '';
        for (const key in data) {
            if (!Object.hasOwnProperty.call(data, key)) continue;

            const user = data[key];
            const user_container = document.createElement("div");
            user_container.className = "user_container";
            user_container.id = user.username;

            const img = document.createElement("img");
            img.src = "../images/design/grey/account.svg";
            img.className = "user_img";

            const name = document.createElement("p");
            name.innerText = user.username;
            name.className = "username";

            user_container.append(img);
            user_container.append(name);

            users.append(user_container);
        }
    });

}

function toggleConnection(e) {
    if (!userStatus.online) {
        e.innerText = "Quitter";
    }
    else {
        e.innerText = "Rejoindre";
    }
    userStatus.online = !userStatus.online;

    emitUserInformation();
}

function toggleMicrophone(e) {
    if (!userStatus.microphone) {
        e.src = "../images/design/grey/mic-circle-sharp.svg";
    }
    else {
        e.src = "../images/design/grey/mic-off-circle-sharp.svg";
    }
    userStatus.microphone = !userStatus.microphone;
    emitUserInformation();
}

function emitUserInformation() {
    socket.emit("userInformation", userStatus);
}