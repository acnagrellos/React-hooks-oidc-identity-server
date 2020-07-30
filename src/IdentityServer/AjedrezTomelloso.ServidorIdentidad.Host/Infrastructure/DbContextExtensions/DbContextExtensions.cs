using System;
using System.Linq;
using AjedrezTomelloso.ServidorIdentidad.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AjedrezTomelloso.ServidorIdentidad.Host.Infrastructure.DbContextExtensions
{
    public static class DbContextExtensions
    {
        public static IServiceCollection AddCttkPspDbContext(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                .AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseSqlServer(
                        configuration?.GetValue<string>("ConnectionStrings:DefaultConnection"));
                });
        }

        public static IHost MigrateDatabase<T>(this IHost host, Action<IHost, T> seeder) where T : DbContext
        {
            using (var scope = host.Services.GetService<IServiceScopeFactory>().CreateScope())
            {
                var hostingEnvironment = scope.ServiceProvider.GetService<IWebHostEnvironment>();
                using (var context = scope.ServiceProvider.GetService<T>())
                {
                    if (context.Database.GetPendingMigrations().Any())
                    {
                        context.Database.Migrate();
                        seeder(host, context);
                    }
                }
                return host;
            }
        }
    }
}
