using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services;
using MediaWebApi.Services.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

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

            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();

            builder.Services.AddScoped<IArtistRepository, ArtistRepository>();
            builder.Services.AddScoped<IArtistService, ArtistService>();

            builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
            builder.Services.AddScoped<IAlbumService, AlbumService>();

            builder.Services.AddScoped<IMediaRepository, MediaRepository>();
            builder.Services.AddScoped<IMediaService, MediaService>();

            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped<IOrderService, OrderService>();

            builder.Services.AddScoped<IOrder_DetailRepository, Order_DetailRepository>();
            builder.Services.AddScoped<IOrder_DetailService, Order_DetailService>();

            builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
            builder.Services.AddScoped<IFeedbackService, FeedbackService>();

            builder.Services.AddScoped<IMediaFeedbackRepository, MediaFeedbackRepository>();
            builder.Services.AddScoped<IMediaFeedbackService, MediaFeedbackService>();

            builder.Services.AddScoped<IAlbumFeedbackRepository,AlbumFeedbackRepository>();
            builder.Services.AddScoped<IAlbumFeedbackService, AlbumFeedbackService>();

            builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
            builder.Services.AddScoped<IPermissionService, PermissionService>();

            builder.Services.AddScoped<IPermission_UserRepository, Permission_UserRepository>();
            builder.Services.AddScoped<IPermission_UserService, Permission_UserService>();

            builder.Services.AddScoped<IArtistAlbumRepository, ArtistAlbumRepository>();
            //builder.Services.AddScoped<IArtistAlbumService, ArtistAlbumService>();

            builder.Services.AddScoped<IArtistMediaRepository, ArtistMediaRepository>();

            builder.Services.AddScoped<IPromotionRepository, PromotionRepository>();
            builder.Services.AddScoped<IPromotionService, PromotionService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            builder.Services.AddAuthorization();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            });

            //builder.Services.AddCors(p => p.AddPolicy("cors", build =>
            //{
            //    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            //}));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); 
            });
            app.UseHttpsRedirection();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
                RequestPath = "/Resources"
            });

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}