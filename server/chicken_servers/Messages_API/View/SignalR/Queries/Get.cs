// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using System.Diagnostics;
using Messages_API.Controller;
using Newtonsoft.Json;
using Utils.Communication;
using Utils.Status;

namespace Messages_API.View.SignalR.Queries;

// The architecture of the data parameter of the query
// This is used by the Json Serializer and Deserializer
public class ViewGetQuery : IQuery
{
    [JsonProperty("user")] public string? User { get; set; }
}

// The architecture of the data returned by the query
public class ViewGetResponse : IResponse<Type>
{
    [JsonProperty("messages")] public List<Message>? Messages { get; set; }
    public static Type Type => Type.Get;
}

// For the moment we can only handle the query
// Maybe in the future we will need more options (queuing for example)
// This part only deal with the form, there is no internal logic
public static class GetQuery
{
    public static string Handle(string data)
    {
        Debug.WriteLine("Received: " + data);
        Query<ViewGetQuery, Type>? query;

        // Deserialize the data
        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewGetQuery, Type>>(data);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewGetResponse, Type>.Error("Invalid JSON"));
        }

        // Somme verifications
        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");

        if (query.Data.User == null)
            return JsonConvert.SerializeObject(Response<ViewGetResponse, Type>.Error("User is null"));

        // Ask the controller layer to get us the messages.
        // We convert our data to a usable format for the controller
        User user = Converter.ViewGetQuery_to_User(query.Data);
        (Status status, List<Message> messages) = Message.GetMessages(user);

        Response<ViewGetResponse, Type> response;

        // if the controller layer return an error, we return the error send back (in the status object)
        // else we return the messages
        if (status.State != StatusState.success)
            response = Response<ViewGetResponse, Type>.ResponseFromStatus(status);
        else
        {
            ViewGetResponse tmpData = new()
            {
                Messages = messages
            };
            response = Response<ViewGetResponse, Type>.Success(tmpData);
        }

        return JsonConvert.SerializeObject(response);
    }
}