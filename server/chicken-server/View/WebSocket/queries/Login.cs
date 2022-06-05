﻿using chicken_server.Controller;
using Newtonsoft.Json;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace chicken_server.View.WebSocket.Queries
{

    public class Login
    {
        [JsonProperty("username")] public string Username { get; set; }
        [JsonProperty("password")] public string Password { get; set; }

        [JsonProperty("token")] public string Token { get; set; }
    }

    public class LoginHandler : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Console.WriteLine("Received: " + e.Data);
            Query<Login>? query;
            try
            {
                query = JsonConvert.DeserializeObject<Query<Login>>(e.Data);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                Send(JsonConvert.SerializeObject(Response<Login>.Error("Invalid JSON")));
                Sessions.CloseSession(ID);
                return;
            }

            if (query is not { Type: Types.login })
            {
                Send(JsonConvert.SerializeObject(Response<Login>.Error("Invalid parameters")));
                Sessions.CloseSession(ID);
                return;
            }


            Response<Login> response = User.CheckLogin(query.Data);

            Send(JsonConvert.SerializeObject(response));
        }

        protected override void OnClose(CloseEventArgs e)
        {
            Console.WriteLine("Client disconnected.");
        }

        protected override void OnOpen()
        {
            Console.WriteLine("Client connected.");
        }
    }
}