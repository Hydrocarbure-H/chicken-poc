using System.Diagnostics;

namespace Authentication_API.Controller
{
    using View.SignalR.Queries;
    public static class Converter
    {
        public static Login ViewLogin_to_Login(ViewLoginQuery query)
        {
            Debug.Assert(query.Username != null, "query.Username != null");
            Debug.Assert(query.Password != null, "query.Password != null");
            
            return new Login(query.Username, query.Password);
        }

        public static User ViewCreateUser_to_User(ViewRegisterQuery query)
        {
            Debug.Assert(query.Username != null, "query.Username != null");
            Debug.Assert(query.Password != null, "query.Password != null");

            return new User(query.Username, query.Password);
        }
    }
}