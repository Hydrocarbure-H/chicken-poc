using System.Collections;
using chicken_server.Controller;
using chicken_server.Model;
using User = chicken_server.Model.User;

namespace chicken_server
{
    public static class Program
    {
        private static volatile bool _running = true;
        private static Server _server;

        public static void Main(string[] args)
        {
            Console.CancelKeyPress += delegate(object? _, ConsoleCancelEventArgs cancelEventArgs)
            {
                cancelEventArgs.Cancel = true;
                _running = false;
                Console.WriteLine("Chicken server is stopping...");
            };

            if (args.Length > 0 && !CheckArgs(args))
                Console.WriteLine("Error while giving args");

            if (args.Length > 0)
                Start(args[0], args[1]);
            else
                Start();
            
            while (_running)
            {
            }

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

            _server = new Server();
            _server.Start();

            Console.WriteLine("Chicken server started");
        }

        private static void Start(string ip, string port)
        {
            Console.WriteLine("Chicken server is starting...");

            _server = new Server(ip, port);
            _server.Start();

            Console.WriteLine("Chicken server started");
        }

        private static void Stop()
        {
            _server.Stop();
            Console.WriteLine("Chicken server stopped");
        }
    }
}