// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Tests microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Authentication_API.Controller;
using NUnit.Framework;
using Utils.Status;

namespace ServersTests.Authentication_API.UnitTests.Controller;

[TestFixture]
[Timeout(10000)]
public class LoginTests
{
    [Test]
    public void Login_Correct()
    {
        // On crée notre user
        const string username = "toto";
        const string password = "titi";
        User toto = new(username, password);
        Status status = User.CreateUser(toto);
        Assert.True(status.State == StatusState.success || status is
            { State: StatusState.failed, Message: "Username already exists" });

        // On se connecte avec notre user
        Login lg = new(username, password);
        (Status status_login, var secret) = User.Login(lg);
        Assert.True(status_login is { State: StatusState.success, Message: "" });

        // On vérifie le secret 
        Assert.True(secret is not null && secret.Length == 36);
    }

    [Test]
    public void Login_Wrong_Password_Empty()
    {
        // On crée notre user
        const string username = "toto";
        const string password = "titi";
        const string wrong_password = "tutu";
        User toto = new(username, password);
        Status status = User.CreateUser(toto);
        Assert.True(status.State == StatusState.success || status is
            { State: StatusState.failed, Message: "Username already exists" });

        // On se connecte avec notre user
        Login lg = new(username, wrong_password);
        (Status status_login, var secret) = User.Login(lg);
        Assert.True(status_login is { State: StatusState.failed, Message: "Invalid username or password" });

        // On vérifie le secret 
        Assert.True(secret is null);
    }

    [Test]
    public void Login_With_Username_Empty()
    {
        // On crée notre user
        const string username = "toto";
        const string username_empty = "";
        const string password = "titi";
        User toto = new(username, password);
        Status status = User.CreateUser(toto);
        Assert.True(status.State == StatusState.success || status is
            { State: StatusState.failed, Message: "Username already exists" });

        // On se connecte avec notre user
        Login lg = new(username_empty, password);
        (Status status_login, var secret) = User.Login(lg);
        Assert.True(status_login is { State: StatusState.error, Message: "Username cannot be empty" });

        // On vérifie le secret 
        Assert.True(secret is null);
    }

    [Test]
    public void Login_With_Password_Empty()
    {
        // On crée notre user
        const string username = "toto";
        const string password = "titi";
        const string password_empty = "";
        User toto = new(username, password);
        Status status = User.CreateUser(toto);
        Assert.True(status.State == StatusState.success || status is
            { State: StatusState.failed, Message: "Username already exists" });

        // On se connecte avec notre user
        Login lg = new(username, password_empty);
        (Status status_login, var secret) = User.Login(lg);
        Assert.True(status_login is { State: StatusState.error, Message: "Password cannot be empty" });

        // On vérifie le secret 
        Assert.True(secret is null);
    }

    [Test]
    public void Login_With_Password_And_Username_Empty()
    {
        // On crée notre user
        const string username = "toto";
        const string password = "titi";

        const string username_empty = "";
        const string password_empty = "";
        User toto = new(username, password);
        Status status = User.CreateUser(toto);
        Assert.True(status.State == StatusState.success || status is
            { State: StatusState.failed, Message: "Username already exists" });

        // On se connecte avec notre user
        Login lg = new(username_empty, password_empty);
        (Status status_login, var secret) = User.Login(lg);
        Assert.True(status_login is { State: StatusState.error, Message: "Password cannot be empty" } || status_login is
            { State: StatusState.error, Message: "Username cannot be empty" });

        // On vérifie le secret 
        Assert.True(secret is null);
    }
}