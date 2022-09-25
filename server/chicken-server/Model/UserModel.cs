using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using DbContext = System.Data.Entity.DbContext;

namespace chicken_server.Model
{
    public static class tmp
    {
        public static void testDB()
        {
            UserModel t = new UserModel
            {
                Id = 1,
                Username = "Thimot", 
                Password = "1234",
                Token = "hsdfsf"
            };

            var db = new ChickenContext();
            db.Users.Add(t);
            //db.SaveChanges();
        }
    }

    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }



    public sealed class ChickenContext : DbContext
    {
        public ChickenContext(): base()
        {
            Database.SetInitializer<ChickenContext>(new DropCreateDatabaseIfModelChanges<ChickenContext>());
        }
        public System.Data.Entity.DbSet<UserModel> Users { get; set; }

        private static void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=bdd.chicken.coloc;Database=chicken_db;Username=chicken_user;Password=chicken_user");

    }
}