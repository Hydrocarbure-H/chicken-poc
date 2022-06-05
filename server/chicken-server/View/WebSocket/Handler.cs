using ChickenServer.View.Queries;
using WebSocketSharp.Server;

namespace ChickenServer.View.Handler
{
    public static class Handler
    {
        public static void SetEndpoints(ref WebSocketServer server)
        {
            foreach (string type in Enum.GetNames(typeof(Queries.Types)))
            {
                server.AddWebSocketService<LoginHandler>("/" + type);
            }
        }
    }
}