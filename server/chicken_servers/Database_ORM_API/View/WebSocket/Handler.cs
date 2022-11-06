using chicken_server.View.WebSocket.Queries;
using System.

namespace chicken_server.View.WebSocket
{
    public static class Handler
    {
        public static void SetEndpoints(ref WebSocketServer server)
        {
            foreach (string type in Enum.GetNames(typeof(Types)))
            {
                server.AddWebSocketService<LoginHandler>("/" + type);
            }
        }
    }
}