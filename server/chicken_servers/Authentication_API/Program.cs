namespace Authentication_API
{
    using View.SignalR;
    public static class Program
    {
        private static volatile bool _running = true;
        private static WebApplication _server;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSignalR();
                
            _server = builder.Build();
            _server.Urls.Add("http://*:9002");
            _server.UseAuthorization();

            
            _server.MapHub<LoginHub>("/login");
            _server.Run();
        }
    }
}