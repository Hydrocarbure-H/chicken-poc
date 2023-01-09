using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Messages_API.Utils;

[JsonConverter(typeof(StringEnumConverter))]
public enum StatusState
{
    success = 0,
    error = 1,
    failed = 2,
}

public sealed class Status
{
    public StatusState State { get; private set; }

    public string Message { get; private set; }

    private Status(StatusState state, string message)
    {
        this.State = state;
        this.Message = message;
    }
    
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
        this.State = newState;
        if (message != null)
            this.Message = message;
        return this.State;
    }

    private string ChangeMessage(string newMessage)
    {
        this.Message = newMessage;
        return this.Message;
    }
    
}