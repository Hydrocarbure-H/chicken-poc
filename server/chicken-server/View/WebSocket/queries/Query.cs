

using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace ChickenServer.View.Queries
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Types
    {
        login,
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum Status
    {
        success,
        failure,
        error,
    }


    public class Query<T>
    {
        [JsonProperty("type")] public Types Type { get; set; }
        [JsonProperty("data")] public T Data { get; set; }
    }

    public class Response<T>
    {
        [JsonProperty("type")] public Types Type { get; set; }
        [JsonProperty("status")] public Status Status { get; set; }
        [JsonProperty("error")] public string ErrorMessage { get; set; }
        [JsonProperty("data")] public T Data { get; set; }

        public static Response<T> Error(string errorMessage)
        {
            return new Response<T>
            {
                Type = Types.login,
                Status = Status.error,
                ErrorMessage = errorMessage
            };
        }

        public static Response<T> Failure(string errorMessage)
        {
            return new Response<T>
            {
                Type = Types.login,
                Status = Status.failure,
                ErrorMessage = errorMessage
            };
        }

        public static Response<T> Success()
        {
            return new Response<T>
            {
                Type = Types.login,
                Status = Status.success,
            };
        }

        public static Response<T> Success(T data)
        {
            return new Response<T>
            {
                Type = Types.login,
                Status = Status.success,
                Data = data
            };
        }
    }
}