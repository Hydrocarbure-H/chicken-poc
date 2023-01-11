using Messages_API.Utils;
using Newtonsoft.Json;

namespace Messages_API.View.SignalR.Queries;

// This template follow the same idea that the Query class
// Here we have more information, like the status (succeeded, failed,...) and the error message if needed
public interface IResponse
{
}

public class Response<T> where T : IResponse
{
    [JsonProperty("type")] public Types Type { get; set; }
    [JsonProperty("status")] public StatusState Status { get; set; }
    [JsonProperty("error")] public string ErrorMessage { get; set; } = "";
    [JsonProperty("data")] public T? Data { get; set; }


    // return the type corresponding to the type of the data
    // Need to be improve to find a better way to do this
    private static Types GetTypeFromTypeT()
    {
        if (typeof(T) == typeof(ViewSendResponse))
            return Types.Send;
        return Types.Get;
    }

    // The different responses type we can send back to the client
    public static Response<T> Error(string errorMessage)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.error,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T> Failure(string failureMessage)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.failed,
            ErrorMessage = failureMessage
        };
    }

    public static Response<T> Success()
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.success,
        };
    }

    public static Response<T> Success(T data)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.success,
            Data = data
        };
    }
    
    public static Response<T> ResponseFromStatus(Status status)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = status.State,
            ErrorMessage = status.Message
        };
    }
}