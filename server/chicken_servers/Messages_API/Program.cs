// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 12:45

#region

using Messages_API.View.SignalR;

#endregion

namespace Messages_API;

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