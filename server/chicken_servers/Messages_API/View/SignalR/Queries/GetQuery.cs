using System.Diagnostics;
using Authentication_API.Utils;
using Messages_API.Controller;
using Newtonsoft.Json;

namespace Messages_API.View.SignalR.Queries;

public class ViewGetQuery : IQuery
{
    [JsonProperty("user")] public string? User { get; set; }
}

public class ViewGetResponse : IResponse
{
    [JsonProperty("messages")] public List<Message>? Messages { get; set; }
}

public static class GetQuery
{
    public static string Handle(string data)
    {
        Debug.WriteLine("Received: " + data);
        Query<ViewGetQuery>? query;

        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewGetQuery>>(data);
        }
        catch (Exception exception)
        {
            Debug.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewGetResponse>.Error("Invalid JSON"));
        }

        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");
        
        if (query.Data.User == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("User is null"));

        User user = Converter.ViewGetQuery_to_User(query.Data);
        (Status status, List<Message> messages) = Message.GetMessages(user);

        Response<ViewGetResponse> response;
        
        if (status.State != StatusState.Success)
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