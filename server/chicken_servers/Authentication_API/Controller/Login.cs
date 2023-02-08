// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

namespace Authentication_API.Controller;

public class Login
{
    public readonly string Password;
    public readonly string Username;

    public Login(string username, string password)
    {
        Username = username;
        Password = password;
    }
}