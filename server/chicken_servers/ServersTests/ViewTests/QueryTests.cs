using Authentication_API.View.SignalR.Queries;
using NUnit.Framework;

namespace ServersTests.ViewTests;

[TestFixture, Timeout(100)]
public class ResponseTests
{
    [Test]
    public void TestSuccess()
    {
        Response<ViewLoginResponse> reference = new Response<ViewLoginResponse>
        {
            Status = Status.success,
            Data = null,
            Type = Types.login,
            ErrorMessage = ""
        };

        Response<ViewLoginResponse> test = Response<ViewLoginResponse>.Success();
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestSuccessWithData()
    {
        ViewLoginResponse data = new ViewLoginResponse {
           Token = "token"
            
        };

        Response<ViewLoginResponse> reference = new Response<ViewLoginResponse>
        {
            Status = Status.success,
            Data = data,
            Type = Types.login,
            ErrorMessage = ""
        };

        Response<ViewLoginResponse> test = Response<ViewLoginResponse>.Success(data);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestError()
    {
        const string message = "this is a error message";
        
        Response<ViewLoginResponse> reference = new Response<ViewLoginResponse>
        {
            Status = Status.error,
            Data = null,
            Type = Types.login,
            ErrorMessage = message
        };

        Response<ViewLoginResponse> test = Response<ViewLoginResponse>.Error(message);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestFailure()
    {
        const string message = "this is a failure message";
        
        Response<ViewLoginResponse> reference = new Response<ViewLoginResponse>
        {
            Status = Status.failure,
            Data = null,
            Type = Types.login,
            ErrorMessage = message
        };

        Response<ViewLoginResponse> test = Response<ViewLoginResponse>.Failure(message);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
}