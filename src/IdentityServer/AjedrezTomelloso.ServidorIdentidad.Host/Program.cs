using System;
using AjedrezTomelloso.ServidorIdentidad.Data;
using AjedrezTomelloso.ServidorIdentidad.Data.Domain;
using AjedrezTomelloso.ServidorIdentidad.Host.Infrastructure.DbContextExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace AjedrezTomelloso.ServidorIdentidad.Host
{
    public class Program
    {
        public static int Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("System", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                .Enrich.FromLogContext()
                // uncomment to write to Azure diagnostics stream
                //.WriteTo.File(
                //    @"D:\home\LogFiles\Application\identityserver.txt",
                //    fileSizeLimitBytes: 1_000_000,
                //    rollOnFileSizeLimit: true,
                //    shared: true,
                //    flushToDiskInterval: TimeSpan.FromSeconds(1))
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Literate)
                .CreateLogger();

            try
            {
                CreateHostBuilder(args)
                    .Build()
                    .MigrateDatabase<ApplicationDbContext>((host, context) =>
                    {
                        using (var scope = host.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
                        {
                            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                            var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                            Log.Information("Seed Data...");
                            context.EnsureSeedData(userMgr, roleMgr);
                        }
                    })
                    .Run();

                Log.Information("Starting host...");
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly.");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseSerilog();
                });
    }
}
