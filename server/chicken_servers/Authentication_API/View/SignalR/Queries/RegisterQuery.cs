// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using System.Diagnostics;
using Authentication_API.Controller;
using Authentication_API.Utils;
using Newtonsoft.Json;

namespace Authentication_API.View.SignalR.Queries;

public class ViewRegisterQuery : IQuery
{
    [JsonProperty("username")] public string? Username { get; set; }
    [JsonProperty("hashed_password")] public string? Password { get; set; }
}

public abstract class ViewRegisterResponse : IResponse
{
}

public static class RegisterQuery
{
    public static string Handle(string data)
    {
        Console.WriteLine("Received: " + data);
        Query<ViewRegisterQuery>? query;

        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewRegisterQuery>>(data);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewRegisterResponse>.Error("Invalid JSON"));
        }

        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");

        if (query is not { Type: Types.register } || query.Data.Username == null || query.Data.Password == null)
            return JsonConvert.SerializeObject(Response<ViewRegisterResponse>.Error("Invalid parameters"));


        User user = Converter.ViewCreateUser_to_User(query.Data);
        Status status = User.CreateUser(user);

        Response<ViewRegisterResponse> response = Response<ViewRegisterResponse>.Success();
        ;

        if (status.State != StatusState.success)
            response = Response<ViewRegisterResponse>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}