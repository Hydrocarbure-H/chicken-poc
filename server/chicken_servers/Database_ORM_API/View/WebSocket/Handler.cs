using Database_ORM_API.View.WebSocket.queries;

namespace Database_ORM_API.View.WebSocket
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