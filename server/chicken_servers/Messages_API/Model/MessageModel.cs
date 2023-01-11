using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using Messages_API.Controller;
using Messages_API.Utils;
using Microsoft.EntityFrameworkCore;

namespace Messages_API.Model;

// This class is used to interact with the database
// Interactions with Database appear only here.
public static class Message
{
    // Function to add a message into the database
    public static Status Add(Controller.Message message)
    {
        Status status = Status.Success();

        MessageModel messageModel = new MessageModel
        {
            Transmitter = message.Transmitter.Token,
            Recipient = message.Recipient.Token,
            Content = message.Content,
            Date = message.Date
        };

        try
        {
            var db = ChickenContext.Create();
            db.Messages.Add(messageModel);
            db.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            status = Status.Error("Error could not send message, error in the database");
        }

        return status;
    }

    // Function to get all messages send or receive from a user
    public static (Status, List<MessageModel>) Get(User user)
    {
        Status status = Status.Success();

        List<MessageModel> messages = new List<MessageModel>();

        try
        {
            var db = ChickenContext.Create();
            messages = db.Messages.Where(message => message.Transmitter.Equals(user.Token) || message.Recipient.Equals(user.Token)).ToList();
        }
        catch (Exception e)
        {
            status = Status.Error("Error could not get messages, error in the database.\n" + e.Message);
        }
        
        return (status, messages);
    }
/*
    public static List<Authentication_API.Controller.User> Get()
    {
        var db = ChickenContext.Create();
        List<UserModel> list = db.Users.ToList();

        // Convert Model.User to Controller.User before sending the list back
        return list.Select(userModel => new Authentication_API.Controller.User(userModel.Username, userModel.Password))
            .ToList();
    }*/
}

// This is the model for the messages table in the database
// All object's name ending with Model are the model for the database
[Table("messages")]
public class MessageModel
{
    [Column("ID")]
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("transmitter")]
    [Required]
    [MaxLength(64)]
    //public Controller.User Transmitter { get; set; }
    public String Transmitter { get; set; }

    [Column("recipient")]
    [Required]
    [MaxLength(64)]
    //public Controller.User Recipient { get; set; }
    public String Recipient { get; set; }

    [Column("content")]
    [Required]
    [MaxLength(1000)]
    public string Content { get; set; }

    [Column("date")] [Required] public DateTime Date { get; set; }
}

// The information needed to connect to our database
public sealed class ChickenContext : DbContext
{
    public static ChickenContext Create()
    {
        var contextOption = new DbContextOptionsBuilder<ChickenContext>()
            .UseNpgsql(
                "Host=bdd.chicken.coloc;Database=chicken_db_messages;Username=chicken_user;Password=chicken_user")
            .Options;

        return new ChickenContext(contextOption);
    }

    private ChickenContext(DbContextOptions<ChickenContext> options) : base(options)
    {
        this.Database.EnsureCreated();
    }

    public DbSet<MessageModel> Messages { get; set; }
}