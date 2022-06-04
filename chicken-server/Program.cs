using WebSocketSharp;
using WebSocketSharp.Server;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Query<T>
{
    [JsonPropertyName("type")]
    public string Type{ get; set; }
    //public int Status{ get; set; }
    //public string ErrorMessage { get; set; }
    //[JsonPropertyName("data")]
    //public string Data { get; set; }
}

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
        Query<Login> test = null;
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
        Console.WriteLine("Received: " + e.Data);
        Send("J'ai un gros chibre");
    }
}

public static class Program
{
    public static void Main()
    {
        WebSocketServer truc = new WebSocketServer("ws://192.168.1.182:9002");
        truc.AddWebSocketService<LoginHandler>("/login");
        
        Console.WriteLine("Server is running...");
        truc.Start();
        
        while (true)
        {
            
        }
    }
}