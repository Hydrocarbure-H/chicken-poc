using Authentication_API.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Authentication_API.View.SignalR.Queries;

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
            Status = StatusState.Error,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T> Failure(string failureMessage)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.Failed,
            ErrorMessage = failureMessage
        };
    }

    public static Response<T> Success()
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.Success,
        };
    }

    public static Response<T> Success(T data)
    {
        return new Response<T>
        {
            Type = GetTypeFromTypeT(),
            Status = StatusState.Success,
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