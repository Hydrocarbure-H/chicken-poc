// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 13:27
//  by Thimot Veyre

#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Authentication_API.Utils;
using Microsoft.EntityFrameworkCore;

#pragma warning disable CS8618

#endregion

namespace Authentication_API.Model;

public static class User
{
    public static Status Add(Controller.User user)
    {
        Status status = Status.Success();

        UserModel userModel = new()
        {
            Username = user.GetUsername(),
            Password = user.GetPassword(),
            Token = user.GetToken()
        };

        try
        {
            ChickenContext db = ChickenContext.Create();
            db.Users.Add(userModel);
            db.SaveChanges();
        }
        catch (Exception)
        {
            status = Status.Error("Error adding user: " + userModel.Username + "in database");
        }

        return status;
    }

    public static Controller.User Get(string username)
    {
        ChickenContext db = ChickenContext.Create();
        List<UserModel> list = db.Users.Where(user => user.Username.Equals(username)).ToList();

        // Convert Model.User to Controller.User before sending the list back
        return list.Select(userModel => new Controller.User(userModel.Username, userModel.Password)).ToList()[0];
    }

    public static List<Controller.User> Get()
    {
        ChickenContext db = ChickenContext.Create();
        List<UserModel> list = db.Users.ToList();

        // Convert Model.User to Controller.User before sending the list back
        return list.Select(userModel => new Controller.User(userModel.Username, userModel.Password)).ToList();
    }
}

[Table("users")]
public class UserModel
{
    [Column("ID")]
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("username")]
    [Required]
    [MaxLength(32)]
    public string Username { get; set; }

    [Column("password")]
    [Required]
    [MaxLength(128)]
    public string Password { get; set; }

    [Column("token")] [MaxLength(64)] public string Token { get; set; }
}

public sealed class ChickenContext : DbContext
{
    private ChickenContext(DbContextOptions<ChickenContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<UserModel> Users { get; set; }

    public static ChickenContext Create()
    {
        DbContextOptions<ChickenContext> contextOption = new DbContextOptionsBuilder<ChickenContext>()
            .UseNpgsql("Host=bdd.chicken.coloc;Database=chicken_db_users;Username=chicken_user;Password=chicken_user")
            .Options;

        return new ChickenContext(contextOption);
    }
}