// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 13:28
//  by Thimot Veyre

#region

using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

#endregion

namespace Utils.Status;

[JsonConverter(typeof(StringEnumConverter))]
public enum StatusState
{
    success = 0,
    error = 1,
    failed = 2
}

public sealed class Status
{
    private Status(StatusState state, string message)
    {
        State = state;
        Message = message;
    }

    public StatusState State { get; private set; }

    public string Message { get; private set; }

    public static Status Success()
    {
        return new Status(StatusState.success, "");
    }

    public static Status Success(string message)
    {
        return new Status(StatusState.success, message);
    }

    public static Status Error(string message)
    {
        return new Status(StatusState.error, message);
    }

    public static Status Failure(string message)
    {
        return new Status(StatusState.failed, message);
    }

    private StatusState ChangeState(StatusState newState, string? message = null)
    {
        State = newState;
        if (message != null)
            Message = message;
        return State;
    }

    private string ChangeMessage(string newMessage)
    {
        Message = newMessage;
        return Message;
    }
}