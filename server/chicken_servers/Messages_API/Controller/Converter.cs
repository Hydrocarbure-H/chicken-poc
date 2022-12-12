using System.Diagnostics;
using Messages_API.View.SignalR.Queries;

namespace Messages_API.Controller;

public class Converter
{
    public static Message ViewSendQuery_to_Message(ViewSendQuery query)
    {
        Debug.Assert(query.Transmitter != null, "query.Transmitter != null");
        Debug.Assert(query.Recipient != null, "query.Recipient != null");
        Debug.Assert(query.Content != null, "query.Content != null");
        
        User transmitter = new User(query.Transmitter);
        User recipient = new User(query.Recipient);
        return new Message(transmitter, recipient, query.Content, query.Date);
    }
}