﻿// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Utils.Status;

namespace Authentication_API.Controller
{
    public class User
    {
        private static List<User> _users = new();
        private static List<User> _onlineUsers = new();

        private static User? FindUser(string username)
        {
            _users = Model.User.Get();
            return _users.Find(user => user._username == username);
        }

        private static User? FindUser(User user)
        {
            _users = Model.User.Get();
            return _users.Find(userTmp => userTmp._username == user._username);
        }

        public static (Status, string?) Login(Login data)
        {
            User? user = FindUser(data.Username);

            if (string.Equals(data.Username, ""))
                return (Status.Error("Username cannot be empty"), null);

            if (string.Equals(data.Password, ""))
                return (Status.Error("Password cannot be empty"), null);

            if (user != null && user.CheckUsername(data.Username) && user.CheckPassword(data.Password))
            {
                user._secret = Guid.NewGuid().ToString();
                _onlineUsers.Add(user);
                return (Status.Success(), user._secret);
            }

            return (Status.Failure("Invalid username or password"), null);
        }

        public static Status Logout(string secret)
        {
            IEnumerable<User> tmpList = _onlineUsers.Where(tmp => tmp._secret == secret);

            if (!tmpList.Any())
                return Status.Failure("User is not online");

            if (tmpList.Count() > 1)
                return Status.Error("Error while loging out user, multiple users with same secret found");

            _onlineUsers.Remove(tmpList.First());

            return Status.Success();
        }

        public static Status CreateUser(User user)
        {
            if (String.Equals(user._username, ""))
                return Status.Error("Username cannot be empty");

            if (String.Equals(user._password, ""))
                return Status.Error("Password cannot be empty");

            if (FindUser(user) != null)
                return Status.Failure("Username already exists");

            return Model.User.Add(user);
        }

        private readonly string _username;
        private readonly string _password;
        private string _secret;

        public User(string username, string password)
        {
            _username = username;
            _password = password;
            _secret = "";
        }

        private bool CheckPassword(string password)
        {
            return _password.Equals(password);
        }

        private bool CheckUsername(string username)
        {
            return _username.Equals(username);
        }

        public string GetToken()
        {
            return _secret;
        }

        public string GetUsername()
        {
            return _username;
        }

        public string GetPassword()
        {
            return _password;
        }
    }
}