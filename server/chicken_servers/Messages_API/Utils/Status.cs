using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Authentication_API.Utils;

[JsonConverter(typeof(StringEnumConverter))]
public enum StatusState
{
    Success = 0,
    Error = 1,
    Failed = 2,
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
        return new Status(StatusState.Success, "");
    }
    
    public static Status Success(string message)
    {
        return new Status(StatusState.Success, message);
    }
    
    public static Status Error(string message)
    {
        return new Status(StatusState.Error, message);
    }
    
    public static Status Failure(string message)
    {
        return new Status(StatusState.Failed, message);
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