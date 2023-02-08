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

namespace Authentication_API.View.SignalR.Queries
{
    public class ViewLoginQuery : IQuery
    {
        [JsonProperty("username")] public string? Username { get; set; }
        [JsonProperty("hashed_password")] public string? Password { get; set; }
    }

    public class ViewLoginResponse : IResponse<Type>
    {
        [JsonProperty("token")] public string? Token { get; set; }
        public static Type Type => Type.Login;
    }

    public static class LoginQuery
    {
        public static string Handle(string data)
        {
            Debug.WriteLine("Received: " + data);
            Query<ViewLoginQuery, Type>? query;

            try
            {
                query = JsonConvert.DeserializeObject<Query<ViewLoginQuery, Type>>(data);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception);
                return JsonConvert.SerializeObject(Response<ViewLoginResponse, Type>.Error("Invalid JSON"));
            }

            Debug.Assert(query != null, nameof(query) + " != null");
            Debug.Assert(query.Data != null, "query.Data != null");

            if (query is not { Type: Type.Login } || query.Data.Username == null || query.Data.Password == null)
                return JsonConvert.SerializeObject(Response<ViewLoginResponse, Type>.Error("Invalid parameters"));

            Login loginRequest = Converter.ViewLogin_to_Login(query.Data);
            (Status status, var token) = User.Login(loginRequest);

            Response<ViewLoginResponse, Type> response;

            if (status.State == StatusState.success)
                response = Response<ViewLoginResponse, Type>.Success(new ViewLoginResponse { Token = token });
            else
                response = Response<ViewLoginResponse, Type>.ResponseFromStatus(status);

            return JsonConvert.SerializeObject(response);
        }
    }
}