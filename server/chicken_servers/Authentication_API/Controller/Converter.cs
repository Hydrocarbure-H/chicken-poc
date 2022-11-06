using chicken_server.View.WebSocket.Queries;

namespace chicken_server.Controller;

public static class Converter
{
    public static Login LoginView_to_Login(LoginViewQuery data)
    {
        if (data.Username == null || data.Password == null)
            throw new Exception("None of LoginView's properties must be null at this point.");
        return new Login(data.Username, data.Password);
    }
}