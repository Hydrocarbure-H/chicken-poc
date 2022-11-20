namespace Database_ORM_API
{
    using Controller.SignalRChat.Hubs;
    public static class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSignalR();
                
            var app = builder.Build();
            app.Urls.Add("http://*:8080");


            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            
            app.MapHub<ChatHub>("/chatHub");
            app.Run();
        }
    }
}