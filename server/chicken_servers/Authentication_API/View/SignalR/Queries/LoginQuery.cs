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

    public class LoginViewResponse : IResponse
    {
        [JsonProperty("token")] public string? Token { get; set; }
    }

    public static class LoginQuery
    {
        public static string Handle(string data)
        {
            Console.WriteLine("Received: " + data);
            Query<ViewLoginQuery>? query;

            try
            {
                query = JsonConvert.DeserializeObject<Query<ViewLoginQuery>>(data);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid JSON"));
            }

            Debug.Assert(query != null, nameof(query) + " != null");
            Debug.Assert(query.Data != null, "query.Data != null");
            
            if (query is not { Type: Types.login } || query.Data.Username == null || query.Data.Password == null)
                return JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid parameters"));

            Login loginRequest = Converter.LoginView_to_Login(query.Data);
            (Utils.Status status, string? token) = User.CheckLogin(loginRequest);

            Response<LoginViewResponse> response;

            if (status.State == Utils.StatusState.Success)
                response = Response<LoginViewResponse>.Success(new LoginViewResponse { Token = token });
            else
                response = Response<LoginViewResponse>.ResponseFromStatus(status);

            return JsonConvert.SerializeObject(response);
        }
    }
}