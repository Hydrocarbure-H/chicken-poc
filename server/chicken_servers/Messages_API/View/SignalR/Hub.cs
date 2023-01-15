// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Messages_API.View.SignalR.Queries;
using Microsoft.AspNetCore.SignalR;

namespace Messages_API.View.SignalR
{
    public sealed class MessagesHub : Hub
    {
        // Function that client can call at hostname:9003/Messages/
        public async Task Send(string data)
        {
            // The handle function return us a string containing the response in json format
            await Clients.Caller.SendAsync("send", SendQuery.Handle(data));
        }

        public async Task Get(string data)
        {
            await Clients.Caller.SendAsync("get", GetQuery.Handle(data));
        }
    }
}