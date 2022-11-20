using chicken_server.View.WebSocket.Queries;
using Database_ORM_API.Controller;
using Newtonsoft.Json;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace Database_ORM_API.View.WebSocket.queries
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

    public class LoginHandler : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Console.WriteLine("Received: " + e.Data);
            Query<LoginViewQuery>? query;

            try
            {
                query = JsonConvert.DeserializeObject<Query<LoginViewQuery>>(e.Data);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                Send(JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid JSON")));
                Sessions.CloseSession(ID);
                return;
            }

            if (query is not { Type: Types.login } || query.Data.Username == null || query.Data.Password == null)
            {
                Send(JsonConvert.SerializeObject(Response<LoginViewResponse>.Error("Invalid parameters")));
                Sessions.CloseSession(ID);
                return;
            }

            Response<LoginViewResponse> response = Response<LoginViewResponse>.Failure("Invalid username or password");

            Login loginRequest = Converter.LoginView_to_Login(query.Data);
            string? token = User.CheckLogin(loginRequest);

            if (token != null)
            {
                LoginViewResponse data = new LoginViewResponse
                {
                    Token = token
                };
                response = Response<LoginViewResponse>.Success(data);
            }

            Send(JsonConvert.SerializeObject(response));
        }

        protected override void OnClose(CloseEventArgs e)
        {
            Console.WriteLine("Client disconnected.");
        }

        protected override void OnOpen()
        {
            Console.WriteLine("Client connected.");
        }
    }
}