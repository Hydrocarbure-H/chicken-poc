using Messages_API.View.SignalR.Queries;
using Microsoft.AspNetCore.SignalR;

namespace Messages_API.View.SignalR
{
    public sealed class MessagesHub : Hub
        {
            public async Task Send(string data)
            {
                await Clients.Caller.SendAsync("send", SendQuery.Handle(data));
            }
        }
}