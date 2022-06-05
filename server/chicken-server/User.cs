namespace chicken_server;

public class User
{
    private static List<User> _users = new List<User>();
    
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
        return _password == password;
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