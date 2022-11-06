using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace chicken_server.View.WebSocket.Queries;

[JsonConverter(typeof(StringEnumConverter))]
public enum Status
{
    success,
    failure,
    error,
}

public interface IResponse
{
}

public class Response<T> where T : IResponse
{
    [JsonProperty("type")] public Types Type { get; set; }
    [JsonProperty("status")] public Status Status { get; set; }
    [JsonProperty("error")] public string ErrorMessage { get; set; } = "";
    [JsonProperty("data")] public T? Data { get; set; }


    // return the type corresponding to the type of the data
    private static Types GetTypeFromTypeT()
    {
        if (typeof(T) == typeof(LoginViewResponse))
            return Types.login;
        return Types.message;
    }

    public static Response<T> Error(string errorMessage)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = Status.error,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T> Failure(string errorMessage)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = Status.failure,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T> Success()
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = Status.success,
        };
    }

    public static Response<T> Success(T data)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = Status.success,
            Data = data
        };
    }
}