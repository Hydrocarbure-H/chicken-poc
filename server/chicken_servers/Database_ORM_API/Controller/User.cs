﻿namespace Database_ORM_API.Controller
{

    public class User
    {
        private static List<User> _users = new();
        private static List<User> _onlineUsers = new();

        public static User? FindUser(string username)
        {
            _users = Model.User.Get();
            return _users.Find(user => user?._username == username);
        }

        public static string? CheckLogin(Login data)
        {
            User? user = FindUser(data.Username);

            if (user != null && user.CheckUsername(data.Username) && user.CheckPassword(data.Password))
                return user._token;
                
            return null;
        }


        private readonly string _username;
        private readonly string _password;
        private readonly string _token;

        public User(string username, string password)
        {
            _username = username;
            _password = password;
            _token = Guid.NewGuid().ToString();
        }

        public bool CheckPassword(string password)
        {
            return _password.Equals(password);
        }

        public bool CheckUsername(string username)
        {
            return _username.Equals(username);
        }

        public string GetToken()
        {
            return _token;
        }

        public string GetUsername()
        {
            return _username;
        }
    }
}