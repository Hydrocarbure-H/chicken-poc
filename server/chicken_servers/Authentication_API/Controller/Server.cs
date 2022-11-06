using chicken_server.View.WebSocket;
using WebSocketSharp.Server;

namespace chicken_server.Controller
{
    
    public sealed class Server
    {
        private readonly WebSocketServer _webSocketServer;

        public Server(string ip = "0.0.0.0", string port = "9002")
        {
            _webSocketServer = new WebSocketServer("ws://" + ip + ":" + port);
            Handler.SetEndpoints(ref _webSocketServer);
        }

        public void Start()
        {
            _webSocketServer.Start();
            Console.WriteLine("listening on " + _webSocketServer.Address + ":" + _webSocketServer.Port);
        }

        public void Stop()
        {
            _webSocketServer.WebSocketServices.Broadcast("{\"type\":\"disconnect\"}");
            _webSocketServer.Stop();
        }
    }
}