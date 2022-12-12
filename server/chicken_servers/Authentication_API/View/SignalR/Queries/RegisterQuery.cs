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
        Debug.WriteLine("Received: " + data);
        Query<ViewRegisterQuery>? query;

        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewRegisterQuery>>(data);
        }
        catch (Exception exception)
        {
            Debug.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewLoginResponse>.Error("Invalid JSON"));
        }

        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");

        if (query is not { Type: Types.create } || query.Data.Username == null || query.Data.Password == null)
            return JsonConvert.SerializeObject(Response<ViewLoginResponse>.Error("Invalid parameters"));


        User user = Converter.ViewCreateUser_to_User(query.Data);
        Status status = User.CreateUser(user);

        Response<ViewRegisterResponse> response = Response<ViewRegisterResponse>.Success();;

        if (status.State != StatusState.Success)
            response = Response<ViewRegisterResponse>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}