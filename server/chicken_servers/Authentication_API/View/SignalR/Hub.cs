namespace Authentication_API.View.SignalR
{
    using Microsoft.AspNetCore.SignalR;
    using Queries;
    
    public sealed class AccountHub : Hub
        {
            public async Task Login(string data)
            {
                await Clients.Caller.SendAsync("login", LoginQuery.Handle(data));
            }
            
            public async Task Register(string data)
            {
                await Clients.Caller.SendAsync("register", RegisterQuery.Handle(data));
            }
        }
}