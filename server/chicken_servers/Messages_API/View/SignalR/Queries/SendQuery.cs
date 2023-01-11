﻿using System.Diagnostics;
using Messages_API.Controller;
using Messages_API.Utils;
using Newtonsoft.Json;

namespace Messages_API.View.SignalR.Queries;


// The architecture of the data parameter of the query
// This is used by the Json Serializer and Deserializer
public class ViewSendQuery : IQuery
{
    [JsonProperty("transmitter")] public string? Transmitter { get; set; }
    [JsonProperty("recipient")] public string? Recipient { get; set; }
    [JsonProperty("content")] public string? Content { get; set; }
    [JsonProperty("date")] public DateTime Date { get; set; }
}


// The architecture of the data returned by the query
public class ViewSendResponse : IResponse
{
}

// For the moment we can only handle the query
// Maybe in the future we will need more options (queuing for example)
// This part only deal with the form, there is not internal logic
public static class SendQuery
{
    public static string Handle(string data)
    {
        Debug.WriteLine("Received: " + data);
        Query<ViewSendQuery>? query;

        // We try to deserialize the data
        try
        {
            query = JsonConvert.DeserializeObject<Query<ViewSendQuery>>(data);
        }
        catch (Exception exception)
        {
            Debug.WriteLine(exception);
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Invalid JSON"));
        }

        // We check if the query is valid
        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");
        
        if (query.Data.Recipient == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Recipient is null"));
        if (query.Data.Transmitter == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Transmitter is null"));
        if (query.Data.Content == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse>.Error("Message is null"));

        
        // We give the data to the controller layer
        Message message = Converter.ViewSendQuery_to_Message(query.Data);
        Status status = Message.SendMessage(message);

        // We return the status
        Response<ViewSendResponse> response = Response<ViewSendResponse>.Success();
        
        if (status.State != StatusState.success)
            response = Response<ViewSendResponse>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}