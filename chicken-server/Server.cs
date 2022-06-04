using WebSocketSharp.Server;

namespace chicken_server;

public class Server
{
    private WebSocketServer server;
    
    public Server(string ip = "localhost", string port = "9002")
    {
        server = new WebSocketServer("ws://" + ip + ":" + port);
        Handler.SetEndpoints(ref server);
    }
    
    public void Start()
    {
        server.Start();
    }
    
    public void Stop()
    {
        server.Stop();
    }
}