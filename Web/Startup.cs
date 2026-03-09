using Domain.Interfaces;
using Domain.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace Web;

public class Startup
{
    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; set; }

    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        Configuration = configuration;
        Environment = env;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy-public", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });

        services.AddHttpClient("NhtsaClient", client =>
        {
            client.BaseAddress = new Uri("https://vpic.nhtsa.dot.gov/api/vehicles/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CarSystem API", Version = "v1" });
        });

        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "Client/dist"; 
        });

        services.AddScoped<ICarService, CarService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarSystem API v1");
            c.RoutePrefix = string.Empty;
        });

        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors("CorsPolicy-public");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "Client";
            if (env.IsDevelopment() || env.IsEnvironment("Local"))
            {
                spa.UseAngularCliServer(npmScript: "start");
            }
        });
    }
}