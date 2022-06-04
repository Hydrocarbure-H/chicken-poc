using chicken_server;

public static class Program
{
    private static volatile bool running = true;
    private static Server server;
    
    public static void Main(string[] args)
    {
        Console.CancelKeyPress += delegate (object sender, ConsoleCancelEventArgs args) {
            args.Cancel = true;
            Program.running = false;
            Console.WriteLine("Chicken server is stopping...");
        };

        if (args.Length > 0 && !CheckArgs(args))
            Console.WriteLine("Error while giving args");

        if (args.Length > 0)
            Start(args[0], args[1]);
        else
            Start();
        
        while(running){}
        
        Stop();
        Console.WriteLine("Goodbye !");
    }

    private static bool CheckArgs(string[] args)
    {
        // TODO
        return true;
    }
    

    private static void Start()
    {
        Console.WriteLine("Chicken server is starting...");
             
        server = new Server();
        server.Start();
             
        Console.WriteLine("Chicken server started");
    }

    private static void Start(string ip, string port)
         {
             Console.WriteLine("Chicken server is starting...");
             
             server = new Server(ip, port);
             server.Start();
             
             Console.WriteLine("Chicken server started");
         }
     
         private static void Stop()
         {
             Console.WriteLine("Chicken server stopped");
         }
}

