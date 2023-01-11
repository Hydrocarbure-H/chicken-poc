using System.Diagnostics;
using Messages_API.Model;
using Messages_API.Utils;

namespace Messages_API.Controller;

// Message class and object.
// Here the logic part happen. For the moment there is nothing to do but it will be useful in the future.
// For example, the logic we do if the message already exist in the database.
// Check Controller.User of Authentication_API to see a good example
public class Message
{
    public static Status SendMessage(Message message)
    {
        if (String.Equals(message.Recipient.Token, ""))
            return Status.Error("Recipient token is empty");
        if (String.Equals(message.Transmitter.Token, ""))
            return Status.Error("Transmitter token is empty");
        
        // Store it in DB
        Status status = Model.Message.Add(message);
        
        // Send it to the user only if he is online and if store was successful
        if (status.State == StatusState.success)
        {
            //TO DO
        }

        return status;
    }
    
    public static (Status, List<Message>) GetMessages(User user)
    {
        if (String.Equals(user.Token, ""))
            return (Status.Error("User token is empty"), new List<Message>());
        
        // Get messages from DB
        (Status status, List<MessageModel> messages) = Model.Message.Get(user);
        return (status, Converter.MessagesModelList_to_MessagesList(messages));
    }

    public User Transmitter { get; }
    public User Recipient { get; }
    public string Content { get; }
    public DateTime Date { get; }

    public Message(User transmitter, User recipient, string content, DateTime date)
    {
        Transmitter = transmitter;
        Recipient = recipient;
        Content = content;
        Date = date;
    }
}