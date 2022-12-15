using System.Diagnostics;
using Authentication_API.Utils;
using Messages_API.Controller;
using Newtonsoft.Json;

namespace Messages_API.View.SignalR.Queries;

public class ViewSendQuery : IQuery
{
    [JsonProperty("transmitter")] public string? Transmitter { get; set; }
    [JsonProperty("recipient")] public string? Recipient { get; set; }
    [JsonProperty("content")] public string? Content { get; set; }
    [JsonProperty("date")] public DateTime Date { get; set; }
}

public class ViewSendResponse : IResponse
{
}

public static class SendQuery
{
    public static string Handle(string data)
    {
        Debug.WriteLine("Received: " + data);
        Query<ViewSendQuery>? query;

        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewSendQuery>>(data);
        }
        catch (Exception exception)
        {
            Debug.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Invalid JSON"));
        }

        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");
        
        if (query.Data.Recipient == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Recipient is null"));
        if (query.Data.Transmitter == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Transmitter is null"));
        if (query.Data.Content == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Message is null"));

        
        Message message = Converter.ViewSendQuery_to_Message(query.Data);
        Status status = Message.SendMessage(message);

        Response<ViewSendResponse> response = Response<ViewSendResponse>.Success();
        
        if (status.State != StatusState.Success)
            response = Response<ViewSendResponse>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}