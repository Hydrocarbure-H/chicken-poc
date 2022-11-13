using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Database_ORM_API.View.WebSocket.queries
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