// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Authentication_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-15 12:44

#region

using System.Diagnostics;
using Authentication_API.View.SignalR.Queries;

#endregion

namespace Authentication_API.Controller;

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