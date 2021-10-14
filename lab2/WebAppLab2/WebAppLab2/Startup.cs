using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using WebAppLab2.Services;

namespace WebAppLab2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "WebAppLab2", Version = "v1"});
            });

            services.AddOptions();
            services.AddMemoryCache();

            services.AddInMemoryRateLimiting();

            services.AddCors(options => 
            options.AddPolicy("Default", builder => builder
                    .WithOrigins(@"http://localhost:5000", @"https://lab2-eight.vercel.app",
                    @"https://lab2-git-lab2-marichellka.vercel.app", @"https://lab2-marichellka.vercel.app")
                    .AllowAnyMethod()
                    .AllowAnyHeader()));

            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddScoped<EmailService>();

            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAppLab2 v1"));
            }

            app.UseCors("Default");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseIpRateLimiting();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}