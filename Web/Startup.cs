using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

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

        services.AddHttpClient("Client", client =>
        {
            client.BaseAddress = new System.Uri("https://vpic.nhtsa.dot.gov/api/vehicles/");
        });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CarSystem API", Version = "v1" });
        });

        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "Client/dist"; 
        });

        // services.AddScoped<ICarService, CarService>(); 
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment() || env.IsEnvironment("Local"))
        {
            app.UseDeveloperExceptionPage();
        }

        // ????? Swagger ?????? ?????? ?????
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarSystem API v1");
        });

        app.UseStaticFiles();
        if (!env.IsDevelopment())
        {
            app.UseSpaStaticFiles();
        }

        app.UseRouting();
        app.UseCors("CorsPolicy-public");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        // ??????? ?? ????? ??? Angular
        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "Client";

            if (env.IsDevelopment() || env.IsEnvironment("Local"))
            {
                // ????? Angular dev server ???????? ??? ????? ??? API
                spa.UseAngularCliServer(npmScript: "start");
            }
        });
    }
}