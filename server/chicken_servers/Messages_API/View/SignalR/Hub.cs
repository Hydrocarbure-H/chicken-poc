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