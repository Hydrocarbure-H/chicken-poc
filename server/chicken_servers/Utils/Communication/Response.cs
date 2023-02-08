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
public interface IResponse
{
    public static abstract Type Type { get; }
}

public class Response<T> where T : IResponse
{
    [JsonProperty("type")] public Type? Type { get; set; }
    [JsonProperty("status")] public StatusState Status { get; set; }
    [JsonProperty("error")] public string ErrorMessage { get; set; } = "";
    [JsonProperty("data")] public T? Data { get; set; }

    // The different responses type we can send back to the client
    public static Response<T> Error(string errorMessage)
    {
        return new Response<T>
        {
            Type = T.Type,
            Status = StatusState.Error,
            ErrorMessage = errorMessage
        };
    }

    public static Response<T> Failure(string failureMessage)
    {
        return new Response<T>
        {
            Type = T.Type,
            Status = StatusState.Failed,
            ErrorMessage = failureMessage
        };
    }

    public static Response<T> Success()
    {
        return new Response<T>
        {
            Type = T.Type,
            Status = StatusState.Success
        };
    }

    public static Response<T> Success(T data)
    {
        return new Response<T>
        {
            Type = T.Type,
            Status = StatusState.Success,
            Data = data
        };
    }

    public static Response<T> ResponseFromStatus(Status.Status status)
    {
        return new Response<T>
        {
            Type = T.Type,
            Status = status.State,
            ErrorMessage = status.Message
        };
    }
}