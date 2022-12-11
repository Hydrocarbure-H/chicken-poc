namespace Authentication_API.View.SignalR
{
    using Microsoft.AspNetCore.SignalR;
    using Queries;
    
    public sealed class LoginHub : Hub
        {
            public async Task GetLoginData(string data)
            {
                await Clients.Caller.SendAsync("login", LoginQuery.Handle(data));
            }
        }
}