using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Services;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var settings = builder.Configuration.GetRequiredSection("ConnectionStrings");

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<MediaContext>(options =>
            {
                options.UseSqlServer(settings["DefaultConnection"],
                    options => options.EnableRetryOnFailure(
                            maxRetryCount: 10,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null
                        ));
            });


            // Add repository and Services
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService, UserService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}