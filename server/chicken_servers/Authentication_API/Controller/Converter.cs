namespace Authentication_API.Controller
{
    using View.SignalR.Queries;
    public static class Converter
    {
        public static Login LoginView_to_Login(LoginViewQuery query)
        {
            if (query.Username == null || query.Password == null)
                throw new Exception("None of LoginView's properties must be null at this point.");
            return new Login(query.Username, query.Password);
        }
    }
}