using Authentication_API.View.SignalR.Queries;
using NUnit.Framework;

namespace ServersTests.ViewTests;

[TestFixture, Timeout(100)]
public class ResponseTests
{
    [Test]
    public void TestSuccess()
    {
        Response<LoginViewResponse> reference = new Response<LoginViewResponse>
        {
            Status = Status.success,
            Data = null,
            Type = Types.login,
            ErrorMessage = ""
        };

        Response<LoginViewResponse> test = Response<LoginViewResponse>.Success();
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestSuccessWithData()
    {
        LoginViewResponse data = new LoginViewResponse {
           Token = "token"
            
        };

        Response<LoginViewResponse> reference = new Response<LoginViewResponse>
        {
            Status = Status.success,
            Data = data,
            Type = Types.login,
            ErrorMessage = ""
        };

        Response<LoginViewResponse> test = Response<LoginViewResponse>.Success(data);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestError()
    {
        const string message = "this is a error message";
        
        Response<LoginViewResponse> reference = new Response<LoginViewResponse>
        {
            Status = Status.error,
            Data = null,
            Type = Types.login,
            ErrorMessage = message
        };

        Response<LoginViewResponse> test = Response<LoginViewResponse>.Error(message);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
    
    [Test]
    public void TestFailure()
    {
        const string message = "this is a failure message";
        
        Response<LoginViewResponse> reference = new Response<LoginViewResponse>
        {
            Status = Status.failure,
            Data = null,
            Type = Types.login,
            ErrorMessage = message
        };

        Response<LoginViewResponse> test = Response<LoginViewResponse>.Failure(message);
        
        Assert.AreEqual(reference.Status, test.Status);
        Assert.AreEqual(reference.Data, test.Data);
        Assert.AreEqual(reference.Type, test.Type);
        Assert.AreEqual(reference.ErrorMessage, test.ErrorMessage);
    }
}