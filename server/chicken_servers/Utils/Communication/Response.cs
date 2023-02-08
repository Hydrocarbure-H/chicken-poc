// Created by Thimot Veyre
// the 2023-02-04 17:04
// 
//  This is part of Utils microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-02-04 17:04
//  by Thimot Veyre

using Newtonsoft.Json;
using Utils.Status;

namespace Utils.Communication;

/*
    This template follow the same idea that the Query class

    Here we have more information,
        like the status (succeeded, failed,...) and the error message if needed
*/
public interface IResponse<out TEnum> where TEnum : Enum
{
    public static abstract TEnum Type { get; }
}

public class Response<T, TEnum> where T : IResponse<TEnum> where TEnum : Enum
{
    [JsonProperty("type")] public TEnum? Type { get; set; }
    [JsonProperty("status")] public StatusState Status { get; set; }
    [JsonProperty("error")] public string ErrorMessage { get; set; } = "";
    [JsonProperty("data")] public T? Data { get; set; }

    // The different responses type we can send back to the client
    public static Response<T, TEnum> Error(string errorMessage)
    {
        return new Response<T, TEnum>
        {
            Type = T.Type,
            Status = StatusState.error,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T, TEnum> Failure(string failureMessage)
    {
        return new Response<T, TEnum>
        {
            Type = T.Type,
            Status = StatusState.failed,
            ErrorMessage = failureMessage
        };
    }

    public static Response<T, TEnum> Success()
    {
        return new Response<T, TEnum>
        {
            Type = T.Type,
            Status = StatusState.success
        };
    }

    public static Response<T, TEnum> Success(T data)
    {
        return new Response<T, TEnum>
        {
            Type = T.Type,
            Status = StatusState.success,
            Data = data
        };
    }

    public static Response<T, TEnum> ResponseFromStatus(Status.Status status)
    {
        return new Response<T, TEnum>
        {
            Type = T.Type,
            Status = status.State,
            ErrorMessage = status.Message
        };
    }
}