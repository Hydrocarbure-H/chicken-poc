using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Authentication_API.Utils;
using Microsoft.EntityFrameworkCore;

namespace Authentication_API.Model
{
    public static class User
    {
        public static Status Add(string username, string password)
        {
            Status status = Status.Success();
            
            UserModel user = new UserModel
            {
                Username = username, 
                Password = password
            };

            try
            {
                var db = ChickenContext.Create();
                db.Users.Add(user);
                db.SaveChanges();
            }
            catch (Exception)
            {
                status = Status.Error("Error adding user: " + user.Username + "in database");
            }

            return status;
        }
        
        public static Authentication_API.Controller.User Get(string username)
        {
            var db = ChickenContext.Create();
            List<UserModel> list = db.Users.Where(user => user.Username.Equals(username)).ToList();
            
            // Convert Model.User to Controller.User before sending the list back
            return list.Select(userModel => new Authentication_API.Controller.User(userModel.Username, userModel.Password)).ToList()[0];
        }
        
        public static List<Authentication_API.Controller.User> Get()
        {
            var db = ChickenContext.Create();
            List<UserModel> list = db.Users.ToList();
            
            // Convert Model.User to Controller.User before sending the list back
            return list.Select(userModel => new Authentication_API.Controller.User(userModel.Username, userModel.Password)).ToList();
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
        
        [Column("token")]
        [MaxLength(64)]
        public string Token { get; set; }
    }



    public sealed class ChickenContext : DbContext
    {
        public static ChickenContext Create()
        {
            var contextOption = new DbContextOptionsBuilder<ChickenContext>()
                .UseNpgsql("Host=bdd.chicken.coloc;Database=chicken_db_users;Username=chicken_user;Password=chicken_user")
                .Options;
            
            return new ChickenContext(contextOption);
        }
        private ChickenContext(DbContextOptions<ChickenContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }
        public DbSet<UserModel> Users { get; set; }

    }
}