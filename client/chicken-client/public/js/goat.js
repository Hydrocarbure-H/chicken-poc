const userStatus = {
    microphone: false,
    mute: false,
    username: "user#" + Math.floor(Math.random() * 999999),
    online: false,
};

const users = document.getElementById("users");

userStatus.username = "MacMini";
window.onload = () => {
    mainFunction(1000);
};

const socket = io("ws://192.168.1.107:5252", { transports: ['websocket'] });
socket.emit("userInformation", userStatus);


function mainFunction(time) {

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        let audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", function (event) {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", function () {
            const audioBlob = new Blob(audioChunks);

            audioChunks = [];

            const fileReader = new FileReader();
            fileReader.readAsDataURL(audioBlob);
            fileReader.onloadend = function () {
                if (!userStatus.microphone || !userStatus.online) return;

                const base64String = fileReader.result;
                socket.emit("voice", base64String);

            };

            mediaRecorder.start();


            setTimeout(function () {
                mediaRecorder.stop();
            }, time);
        });

        setTimeout(function () {
            mediaRecorder.stop();
        }, time);
    });


    socket.on("send", function (data) {
        const audio = new Audio(data);
        audio.play().then(r => console.log(r)).catch(e => console.log(e));
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