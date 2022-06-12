using chicken_server.Controller;
using NUnit.Framework;

namespace chicken_server_tests.ControllerTests;

[TestFixture, Timeout(100)]
public class UserTests
{
    [Test]
    public void CheckUsername()
    {
        const string username = "username";
        const string password = "password";
        User user = new User(username,password);
        
        Assert.AreEqual(user.GetUsername(), username);
        Assert.IsTrue(user.CheckUsername(username));
    }
    
    [Test]
    public void CheckPassword()
    {
        const string username = "username";
        const string password = "password";
        User user = new User(username,password);
        
        Assert.IsTrue(user.CheckPassword(password));
    }


    [Test]
    public void CheckLogin()
    {
        
    }
}