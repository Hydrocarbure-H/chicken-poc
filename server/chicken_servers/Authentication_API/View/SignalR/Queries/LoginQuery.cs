using Authentication_API.Controller;
using Newtonsoft.Json;

namespace Authentication_API.View.SignalR.Queries
{
    public class LoginViewQuery : IQuery
    {
        [JsonProperty("username")] public string? Username { get; set; }
        [JsonProperty("password")] public string? Password { get; set; }
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
            Query<LoginViewQuery>? query;

            try
            {
                query = JsonConvert.DeserializeObject<Query<LoginViewQuery>>(data);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid JSON"));
            }

            if (query is not { Type: Types.login } || query.Data.Username == null || query.Data.Password == null)
                return JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid parameters"));

            
            Response<LoginViewResponse> response = Response<LoginViewResponse>.Failure("Invalid username or password");

            Login loginRequest = Converter.LoginView_to_Login(query.Data);
            string? token = User.CheckLogin(loginRequest);

            if (token != null)
            {
                LoginViewResponse dataResponse = new LoginViewResponse
                {
                    Token = token
                };
                response = Response<LoginViewResponse>.Success(dataResponse);
            }

            return JsonConvert.SerializeObject(response);
        }
    }
}