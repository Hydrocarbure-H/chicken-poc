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