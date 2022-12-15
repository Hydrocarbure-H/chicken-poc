using System.Diagnostics;
using Messages_API.Model;
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
    
    public static User ViewGetQuery_to_User(ViewGetQuery query)
    {
        Debug.Assert(query.User != null, "query.User != null");
        
        return new User(query.User);
    }

    public static Message MessageModel_to_Message(MessageModel messageModel)
    {
        return new Message(messageModel.Transmitter, messageModel.Recipient, messageModel.Content, messageModel.Date);
    }
    public static List<Message> MessagesModelList_to_MessagesList(IEnumerable<MessageModel> messageModels)
    {
        List<Message> messages = new List<Message>();

        foreach (MessageModel messageModel in messageModels)
            messages.Append(MessageModel_to_Message(messageModel));

        return messages;
    }
}