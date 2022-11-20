const signalR = require("@microsoft/signalr");

var connection = new signalR.HubConnectionBuilder().withUrl("http://192.168.1.182:8080/chatHub").build();
connection.start().then(function () {
    console.log("JS : Connected to the server !");
}).catch(function (err) {
    return console.error(err.toString());
});
// sleep before connecting
setTimeout(function () {
    user = "test";
    message = "test";
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    connection.on("ReceiveMessage", function (user, message) {
        console.log("JS : Received message from the server : " + message);
    });
}, 1000);