using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace chicken_server.View.WebSocket.Queries
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Types
    {
        login,
        message
    }

    public interface IQuery
    {
    }

    public class Query<T> where T : IQuery
    {
        [JsonProperty("type")] public Types Type { get; set; }
        [JsonProperty("data")] public T Data { get; set; }
    }
}