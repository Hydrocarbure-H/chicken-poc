﻿namespace Messages_API.Controller;

public class User
{
    private readonly string _token;
    

    public User(string token)
    {
        _token = token;
    }

    public string Token => _token;
}