// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using Authentication_API.Utils;

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

        public static (Status, string?) CheckLogin(Login data)
        {
            User? user = FindUser(data.Username);

            if (String.Equals(data.Username, ""))
                return (Status.Error("Username cannot be empty"), null);

            if (String.Equals(data.Password, ""))
                return (Status.Error("Password cannot be empty"), null);

            if (user != null && user.CheckUsername(data.Username) && user.CheckPassword(data.Password))
                return (Status.Success(), user._token);

            return (Status.Failure("Invalid username or password"), null);
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
        private readonly string _token;

        public User(string username, string password)
        {
            _username = username;
            _password = password;
            _token = Guid.NewGuid().ToString();
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
            return _token;
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