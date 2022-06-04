namespace chicken_server.queries;
using WebSocketSharp;
using WebSocketSharp.Server;
using System.Text.Json;
using System.Text.Json.Serialization;
public class Login
{
    [JsonPropertyName("username")]
    public string Username { get; set; }
    [JsonPropertyName("hased_password")]
    public string Password { get; set; }
}

public class LoginHandler : WebSocketBehavior
{
    protected override void OnMessage (MessageEventArgs e)
    {
        Console.WriteLine("Received: " + e.Data);
        Query<Login>? test;
        try
        { 
            test = JsonSerializer.Deserialize<Query<Login>>(e.Data);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            throw;
        }
        
        if (test == null)
            Console.WriteLine("test is null");
        else
        {
            Console.WriteLine("test is not null");
            Console.WriteLine(test.Type);
            // Console.WriteLine(test.Data.Username);
            // Console.WriteLine(test.Data.Password);
        }
    }
}