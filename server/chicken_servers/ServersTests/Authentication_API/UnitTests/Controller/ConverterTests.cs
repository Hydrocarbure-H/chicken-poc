using Authentication_API.Controller;
using Authentication_API.View.SignalR.Queries;
using NUnit.Framework;
using FluentAssertions;

namespace ServersTests.Authentication_API.UnitTests.Controller;

[TestFixture, Timeout(100)]
public class ConverterTests
{
    [Test]
    public void ViewLogin_to_LoginBasic()
    {
        const string username = "username";
        const string password = "password";
        
        ViewLoginQuery vlq = new ViewLoginQuery
        {
            Username = username,
            Password = password
        };

        Login lg = new Login("t", password);
        Login result = Converter.ViewLogin_to_Login(vlq);

        result.Should().BeEquivalentTo(lg);
    }
}