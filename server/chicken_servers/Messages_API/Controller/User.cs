// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

namespace Messages_API.Controller;

// A user class and object, it as the same purpose as the Message object
// Not very used today
public class User
{
    private readonly string _token;
    public string Token => _token;

    public User(string token)
    {
        _token = token;
    }
}