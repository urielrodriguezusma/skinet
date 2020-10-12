using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc(opt =>
            {
                opt.EnableEndpointRouting = false;
                opt.ReturnHttpNotAcceptable = true;
            });

            services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlite(_configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging();
            });

            services.AddSwaggerDocumentation();
            services.AddAutoMapper(typeof(MapperProfile));
            services.AddApplicationServices();
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");


            app.UseRouting();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();
            app.UserSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
