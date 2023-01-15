// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 13:27
//  by Thimot Veyre

#region

using Authentication_API.View.SignalR.Queries;
using Microsoft.AspNetCore.SignalR;

#endregion

namespace Authentication_API.View.SignalR;

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

    public async Task GetInformations(string data)
    {
        //await Clients.Caller.SendAsync("getInfo", GetInfoQuery.Handle(data));
    }
}