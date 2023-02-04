// Created by Thimot Veyre
// the 2023-02-04 16:44
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-02-04 16:44
//  by Thimot Veyre

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Messages_API.View.SignalR.Queries;

// Base form for each query, for the moment query only the type and the data for the query
// Useful for checking that the request arrived at the good endpoint.
[JsonConverter(typeof(StringEnumConverter))]
public enum Type
{
    Send,
    Get
}