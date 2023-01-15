// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:17

#region

using Authentication_API.View.SignalR;

#endregion

namespace Authentication_API;

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