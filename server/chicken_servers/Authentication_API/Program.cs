namespace Authentication_API
{
    using View.SignalR;
    public static class Program
    {
        private static WebApplication _server = null!;

        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSignalR();
                
            _server = builder.Build();
            _server.Urls.Add("http://*:9002");
            _server.UseAuthorization();

            
            _server.MapHub<AccountHub>("/Account");
            _server.Run();
        }
    }
}