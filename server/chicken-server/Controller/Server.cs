using WebSocketSharp.Server;
namespace chicken_server;

public sealed class Server
{
    private readonly WebSocketServer _webSocketServer;

    public Server(string ip = "localhost", string port = "4444")
    {
        _webSocketServer = new WebSocketServer("ws://" + ip + ":" + port);
        Handler.SetEndpoints(ref _webSocketServer);
    }
    
    public void Start()
    {
        _webSocketServer.Start();
    }
    
    public void Stop()
    {
        _webSocketServer.WebSocketServices.Broadcast("{\"type\":\"disconnect\"}");
        _webSocketServer.Stop();
    }
}