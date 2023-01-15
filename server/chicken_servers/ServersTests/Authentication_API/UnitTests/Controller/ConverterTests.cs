// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of ServersTests microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Authentication_API.Controller;
using Authentication_API.View.SignalR.Queries;
using FluentAssertions;
using NUnit.Framework;

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