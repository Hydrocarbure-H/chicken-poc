using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

//namespace chicken_server.Model;

public class UserModel
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }
}


namespace ContosoUniversity.DAL
{
    public class ChickenTest : DbContext
    {
    
        public ChickenTest() : base("ChickenTest")
        {
        }
        
        public DbSet<UserModel> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}