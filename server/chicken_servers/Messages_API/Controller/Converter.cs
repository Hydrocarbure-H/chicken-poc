﻿// Created by Thimot Veyre
// the 2023-01-09 16:42
// 
//  This is part of Messages_API microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-01-13 19:07

using System.Diagnostics;
using Messages_API.Model;
using Messages_API.View.SignalR.Queries;

namespace Messages_API.Controller;

// Converter of object between layers.
// For example a MessageModel to a Message
public static class Converter
{
    public static Message ViewSendQuery_to_Message(ViewSendQuery query)
    {
        Debug.Assert(query.Transmitter != null, "query.Transmitter != null");
        Debug.Assert(query.Recipient != null, "query.Recipient != null");
        Debug.Assert(query.Content != null, "query.Content != null");

        User transmitter = new User(query.Transmitter);
        User recipient = new User(query.Recipient);
        return new Message(transmitter, recipient, query.Content, query.Date);
    }

    public static User ViewGetQuery_to_User(ViewGetQuery query)
    {
        Debug.Assert(query.User != null, "query.User != null");

        return new User(query.User);
    }

    public static Message MessageModel_to_Message(MessageModel messageModel)
    {
        return new Message(new User(messageModel.Transmitter), new User(messageModel.Recipient), messageModel.Content,
            messageModel.Date);
    }

    public static List<Message> MessagesModelList_to_MessagesList(IEnumerable<MessageModel> messageModels)
    {
        List<Message> messages = new List<Message>();

        foreach (MessageModel messageModel in messageModels)
            messages.Add(MessageModel_to_Message(messageModel));

        return messages;
    }
}