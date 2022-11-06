using Newtonsoft.Json;

namespace chicken_server.Controller;

public class Login
{
    [JsonProperty("username")] public string Username { get; }
    [JsonProperty("password")] public string Password { get; }

    public Login()
    {
        Username = "";
        Password = "";
    }

    public Login(string username, string password)
    {
        Username = username;
        Password = password;
    }
}