using Authentication_API.Utils;

namespace Messages_API.Controller;

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
        if (status.State == StatusState.Success)
        {
            //TO DO
        }

        return status;
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