namespace chicken_server.queries;
using System.Text.Json.Serialization;


public enum Types
{
    login,
}



public class Query<T>
{
   /* private static readonly Dictionary<Types, string> TypesToString = new()
    {
        {Types.login, "login"},
    };

    public static string GetStringFromType(Types type)
    {
        return TypesToString[type];
    }
    */

    [JsonPropertyName("type")]
    public string Type{ get; set; }
    //public int Status{ get; set; }
    //public string ErrorMessage { get; set; }
    //[JsonPropertyName("data")]
    //public string Data { get; set; }
}