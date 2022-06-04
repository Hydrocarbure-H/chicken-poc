using chicken_server.queries;
using WebSocketSharp.Server;

namespace chicken_server;

public static class Handler
{
   /* private static Dictionary<Types, > handlers = new ()
    {
        {Types.login, LoginHandler},
    }*/
    public static void SetEndpoints(ref WebSocketServer server)
    {
        foreach (string type in Enum.GetNames(typeof(queries.Types)))
        {
            server.AddWebSocketService<LoginHandler>("/" + type);
        }
    }
}