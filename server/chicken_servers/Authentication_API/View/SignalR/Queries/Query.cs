// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Authentication_API.View.SignalR.Queries
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Types
    {
        login,
        register
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