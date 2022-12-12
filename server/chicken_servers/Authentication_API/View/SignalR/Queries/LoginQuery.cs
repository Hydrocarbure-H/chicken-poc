using System.Diagnostics;
using Authentication_API.Controller;
using Newtonsoft.Json;

namespace Authentication_API.View.SignalR.Queries
{
    public class ViewLoginQuery : IQuery
    {
        [JsonProperty("username")] public string? Username { get; set; }
        [JsonProperty("hashed_password")] public string? Password { get; set; }
    }

    public class ViewLoginResponse : IResponse
    {
        [JsonProperty("token")] public string? Token { get; set; }
    }

    public static class LoginQuery
    {
        public static string Handle(string data)
        {
            Debug.WriteLine("Received: " + data);
            Query<ViewLoginQuery>? query;

            try
            {
                query = JsonConvert.DeserializeObject<Query<ViewLoginQuery>>(data);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception);
                return JsonConvert.SerializeObject(Response<ViewLoginResponse>.Error("Invalid JSON"));
            }

            Debug.Assert(query != null, nameof(query) + " != null");
            Debug.Assert(query.Data != null, "query.Data != null");
            
            if (query is not { Type: Types.login } || query.Data.Username == null || query.Data.Password == null)
                return JsonConvert.SerializeObject(Response<ViewLoginResponse>.Error("Invalid parameters"));

            Login loginRequest = Converter.ViewLogin_to_Login(query.Data);
            (Utils.Status status, string? token) = User.CheckLogin(loginRequest);

            Response<ViewLoginResponse> response;

            if (status.State == Utils.StatusState.Success)
                response = Response<ViewLoginResponse>.Success(new ViewLoginResponse { Token = token });
            else
                response = Response<ViewLoginResponse>.ResponseFromStatus(status);

            return JsonConvert.SerializeObject(response);
        }
    }
}