﻿// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 13:20

#region

using Newtonsoft.Json;
using Utils.Status;

#endregion

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
        if (typeof(T) == typeof(ViewLoginResponse))
            return Types.login;
        return Types.register;
    }

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
            Status = StatusState.success
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