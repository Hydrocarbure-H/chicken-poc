namespace Database_ORM_API.Controller
{
    using Microsoft.AspNetCore.SignalR;

    namespace SignalRChat.Hubs
    {
        public class LoginHub : Hub
        {
            public async Task SendMessage(string user, string message)
            {
                await Clients.Caller.SendAsync()
            }
        }
    }
}