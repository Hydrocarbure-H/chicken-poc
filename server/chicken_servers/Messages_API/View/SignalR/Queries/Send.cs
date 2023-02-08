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
public class ViewSendQuery : IQuery
{
    [JsonProperty("transmitter")] public string? Transmitter { get; set; }
    [JsonProperty("recipient")] public string? Recipient { get; set; }
    [JsonProperty("content")] public string? Content { get; set; }
    [JsonProperty("date")] public DateTime Date { get; set; }
}

// The architecture of the data returned by the query
public class ViewSendResponse : IResponse<Type>
{
    public static Type Type => Type.Send;
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
            return JsonConvert.SerializeObject(Response<ViewSendResponse, Type>.Error("Invalid JSON"));
        }

        // We check if the query is valid
        Debug.Assert(query != null, nameof(query) + " != null");
        Debug.Assert(query.Data != null, "query.Data != null");

        if (query.Data.Recipient == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse, Type>.Error("Recipient is null"));
        if (query.Data.Transmitter == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse, Type>.Error("Transmitter is null"));
        if (query.Data.Content == null)
            return JsonConvert.SerializeObject(Response<ViewSendResponse, Type>.Error("Message is null"));


        // We give the data to the controller layer
        Message message = Converter.ViewSendQuery_to_Message(query.Data);
        Status status = Message.SendMessage(message);

        // We return the status
        Response<ViewSendResponse, Type> response = Response<ViewSendResponse, Type>.Success();

        if (status.State != StatusState.success)
            response = Response<ViewSendResponse, Type>.ResponseFromStatus(status);

        return JsonConvert.SerializeObject(response);
    }
}