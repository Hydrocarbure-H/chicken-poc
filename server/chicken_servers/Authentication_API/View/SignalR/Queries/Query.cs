using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Authentication_API.View.SignalR.Queries
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
        [JsonProperty("data")] public T? Data { get; set; }
    }
}