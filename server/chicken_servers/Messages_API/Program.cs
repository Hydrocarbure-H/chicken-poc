using Messages_API.View.SignalR;

namespace Messages_API
{
    public static class Program
    {
        private static WebApplication _server = null!;

        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSignalR();
            
            // Add options that we need
            _server = builder.Build();
            _server.Urls.Add("http://*:9003");
            _server.UseAuthorization();

            // Connect our code to the WebApplication
            _server.MapHub<MessagesHub>("/Messages");
            _server.Run();
        }
    }
}