using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Utils.Communication;

[JsonConverter(typeof(StringEnumConverter))]
public enum Type
{
    Login,
    Register,
    Send,
    Get
}