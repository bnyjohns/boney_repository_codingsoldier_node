class SeedStudies{
    initialStudies(){
        return [
        {
            id: 1,
            studyHeader: "WCF Unity",
            studyContent: `All WCF services has an attribute of the name “Factory” which usually has the value: ServiceHostFactory.

Factory that provides instances of ServiceHost in managed hosting environments where the host instance is created dynamically in response to incoming messages.

The managed hosting environments that support dynamic activation are Internet Information Services (IIS) and Windows Process Activation Service (WAS).

In Service Tier, Let’s take MyService.
<%@ ServiceHost Language="C#" Debug="true" Service="MyNameSpace.MyService, MyNameSpace.MyService" Factory="MyNameSpace.MyService.MyServiceHostFactory, MyNameSpace.MyService" %>

Its factory is MyServiceHostFactory.
 

UnityServiceHostFactory is a type available in Unity.Wcf.dll and it derives from ServiceHostFactory.

namespace Unity.Wcf
{
    public abstract class UnityServiceHostFactory : ServiceHostFactory
    {
        protected abstract void ConfigureContainer(IUnityContainer container);
        protected override ServiceHost CreateServiceHost(System.Type serviceType, Uri[] baseAddresses)
        {
            UnityContainer container = new UnityContainer();
            this.ConfigureContainer(container);
            return new UnityServiceHost(container, serviceType, baseAddresses);
        }
    }
}


When any service is launched it hits, the below method in the class “InjectionServiceHostFactory”.

protected override ServiceHost CreateServiceHost(Type serviceType, Uri[] baseAddresses)
        {
            try
            {
                ServiceHost serviceHost = base.CreateServiceHost(serviceType, baseAddresses);

                serviceHost.Closed += new EventHandler(OnClosed);
                serviceHost.Opened += new EventHandler(OnOpened);
                serviceHost.Faulted += new EventHandler(OnFaulted);

                return serviceHost;
            }
            catch (Exception e)
            {
                log.Error("Error encountered during service host creation", e);
                throw;
            }
        }

It can be overrridden to any derived class we want, but here it is overridden max till InjectionServiceHostFactory.
This call in turn triggers ConfigureContainer(IUnity container) of the respective ServiceHostFactory class.
Here is the place where the dependencies are predefined and injected using Unity.`,
            categoryName: "C#.NET"            
        },  
        {
            id: 2,
            studyHeader: "Async/Await Funda",
            studyContent: `MSDN has a pretty good explanation on the funda. Read it 3-4 times without any apprehensions.
https://msdn.microsoft.com/en-us/library/hh191443.aspx
Important Points to Remember:
1.	Async/await approach don’t keep threads blocked. Once an async call is awaited, thread is suspended and returned to thread pool. Once the call is done, thread is retrieved from the thread pool to continue with the rest of the operation. So the time, when the thread is not used(when the I/O, Network operation happen), thread can do other useful things.
So this is super helpful in High Traffic environments, when multiple requests are queued on the server.
http://www.asp.net/mvc/overview/performance/using-asynchronous-methods-in-aspnet-mvc-4

2.	Usage of Await keyword
Without await keyword it wouldn’t make much sense to have an async method.
And it is upto the user when to await.
When we can’t move forward without data from await, we will have to await.
Else get the “Task” return object from the method, do the independent work and after independent work completion, await the Task.`,
            categoryName: "C#.NET"    
        },
        {
            id: 3,
            studyHeader: "Cool SQL Commands",
            studyContent: `To know all connections:
USE master
SELECT * FROM sys.sysprocesses WHERE dbid = DB_ID('DBName')



http://www.sqlmatters.com/Articles/sp_who2%20-%20filtering%20and%20sorting%20the%20results.aspx


Take a Database Offline using T-SQL and wait for existing connections to close

ALTER DATABASE AdventureWorks SET OFFLINE
The command waits for existing connections to close and also does not accept any new connections. Use at discretion!


Take a Database Offline Immediately using T-SQL

ALTER DATABASE AdventureWorks
SET OFFLINE WITH ROLLBACK IMMEDIATE

Bring back the Database Online

ALTER DATABASE AdventureWorks
SET ONLINE



To kill existing sql connections, use Activity Monitor. Either by right clicking the server and selecting Activity Monitor.  Opening the Activity Monitor, you can view all process info. You should be able to find the locks for the database you're interested in and kill those locks, which will also kill the connection.

Or Run the below Query:
USE master
GO

DECLARE @kill varchar(8000) = '';
SELECT @kill = @kill + 'kill ' + CONVERT(varchar(5), spid) + ';'
FROM master..sysprocesses 
WHERE dbid = db_id('MyDB')

EXEC(@kill);`,
            categoryName: "SQL"    
        }
        ];
    }    
}

export default SeedStudies;