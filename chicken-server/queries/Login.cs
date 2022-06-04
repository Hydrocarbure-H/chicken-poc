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

        Console.WriteLine("type: " + test.Type);
        Console.WriteLine("username: " + test.Data.Username);
        Console.WriteLine("password: " + test.Data.Password);
        
        
        Send(JsonSerializer.Serialize(test));

    }

    protected override void OnClose(CloseEventArgs e)
    {
        Console.WriteLine("Client disconnected.");
        Send("{\"type\":\"disconnect\"}");
    }

    protected override void OnOpen()
    {
        Console.WriteLine("Client connected.");
    }
}