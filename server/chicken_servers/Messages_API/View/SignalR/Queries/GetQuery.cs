using System.Diagnostics;
using Messages_API.Controller;
using Messages_API.Utils;
using Newtonsoft.Json;

namespace Messages_API.View.SignalR.Queries;

// The architecture of the data parameter of the query
// This is used by the Json Serializer and Deserializer
public class ViewGetQuery : IQuery
{
    [JsonProperty("user")] public string? User { get; set; }
}

// The architecture of the data returned by the query
public class ViewGetResponse : IResponse
{
    [JsonProperty("messages")] public List<Message>? Messages { get; set; }
}

// For the moment we can only handle the query
// Maybe in the future we will need more options (queuing for example)
// This part only deal with the form, there is not internal logic
public static class GetQuery
{
    public static string Handle(string data)
    {
        Debug.WriteLine("Received: " + data);
        Query<ViewGetQuery>? query;

        // Deserialize the data
        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewGetQuery>>(data);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewGetResponse>.Error("Invalid JSON"));
        }

        // Somme verifications
        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");
        
        if (query.Data.User == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("User is null"));

        // Ask the controller layer to get us the messages.
        // We convert our data to a usable format for the controller
        User user = Converter.ViewGetQuery_to_User(query.Data);
        (Status status, List<Message> messages) = Message.GetMessages(user);

        Response<ViewGetResponse> response;
        
        // if the controller layer return an error, we return the error send back (in the status object)
        // else we return the messages
        if (status.State != StatusState.success)
            response = Response<ViewGetResponse>.ResponseFromStatus(status);
        else
        {
            ViewGetResponse tmpData = new()
            {
                Messages = messages
            };
            response = Response<ViewGetResponse>.Success(tmpData);
        }

        return JsonConvert.SerializeObject(response);
    }
}