using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Messages_API.View.SignalR.Queries
{
    // Base form for each query, for the moment query only the type and the data for the query
    // Useful for checking that the request arrived at the good endpoint.
    
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Types
    {
        Send,
        Get
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