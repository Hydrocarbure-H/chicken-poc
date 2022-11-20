namespace Authentication_API.View.SignalR
{
    using Microsoft.AspNetCore.SignalR;
    using Queries;
    
    public sealed class LoginHub : Hub
        {
            public async Task getLoginData(string data)
            {
                await Clients.Caller.SendAsync(LoginQuery.Handle(data))
            }
        }
}