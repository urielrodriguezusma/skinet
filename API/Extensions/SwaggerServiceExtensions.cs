﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {

            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("1", new OpenApiInfo { Title = "Skinet API", Version = "v1" });

                var securitySchema= new OpenApiSecurityScheme
                {
                    Description = "JWT auth Berar Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type= SecuritySchemeType.Http,
                    Scheme="bearer",
                    Reference=new OpenApiReference
                    {
                        Type= ReferenceType.SecurityScheme,
                        Id= "Bearer"
                    }
                };

                opt.AddSecurityDefinition("Bearer", securitySchema);
                var securityRequirement = new OpenApiSecurityRequirement { { securitySchema, new[] { "Bearer" } } };
                opt.AddSecurityRequirement(securityRequirement);
            });

            return services;
        }

        public static IApplicationBuilder UserSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Skinet API v1");
            });

            return app;
        }
    }
}
