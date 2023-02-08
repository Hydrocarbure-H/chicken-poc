// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using System.Diagnostics;
using Authentication_API.Controller;
using Newtonsoft.Json;
using Utils.Communication;
using Utils.Status;

namespace Authentication_API.View.SignalR.Queries;

public class ViewRegisterQuery : IQuery
{
    [JsonProperty("username")] public string? Username { get; set; }
    [JsonProperty("hashed_password")] public string? Password { get; set; }
}

public abstract class ViewRegisterResponse : IResponse<Type>
{
    public static Type Type => Type.Register;
}

public static class RegisterQuery
{
    public static string Handle(string data)
    {
        Console.WriteLine("Received: " + data);
        Query<ViewRegisterQuery, Type>? query;

        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewRegisterQuery, Type>>(data);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewRegisterResponse, Type>.Error("Invalid JSON"));
        }

        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");

        if (query is not { Type: Type.Register } || query.Data.Username == null || query.Data.Password == null)
            return JsonConvert.SerializeObject(Response<ViewRegisterResponse, Type>.Error("Invalid parameters"));


        User user = Converter.ViewCreateUser_to_User(query.Data);
        Status status = User.CreateUser(user);

        Response<ViewRegisterResponse, Type> response = Response<ViewRegisterResponse, Type>.Success();
        ;

        if (status.State != StatusState.success)
            response = Response<ViewRegisterResponse, Type>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}