// Created by Thimot Veyre
// the 2023-02-04 16:53
// 
//  This is part of Utils microservice.
//  This code belong to the chicken_servers project.
// 
//  Last modified on 2023-02-04 16:53
//  by Thimot Veyre

using Newtonsoft.Json;

namespace Utils.Communication;

public interface IQuery
{
}

public class Query<T> where T : IQuery
{
    [JsonProperty("data")] public T? Data { get; set; }
}