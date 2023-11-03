using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using apiArticulos.Data;
using apiArticulos.Business;
using apiArticulos.Business.Imp;
using apiArticulos.Entities;
using apiTiendas.Business.Imp;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<apiArticulosContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("apiArticulosContext") ?? throw new InvalidOperationException("Connection string 'apiArticulosContext' not found.")));

// Add services to the container.
var OrgienesPermitidos= "_OrigenesPermitidos";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: OrgienesPermitidos,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200","http://*","https://*").AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Roberto Corona - Backend",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Agrega el token con el prefijo Bearer",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
               {
                 new OpenApiSecurityScheme
                 {
                   Reference = new OpenApiReference
                   {
                     Type = ReferenceType.SecurityScheme,
                     Id = "Bearer"
                   }
                  },
                  new string[] { }
                }
              });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});


builder.Services.AddAuthorization();

builder.Services.AddScoped<IBusiness<Articulo>, ArticuloImp>();
builder.Services.AddScoped<IBusiness<Cliente>, ClienteImp>();
builder.Services.AddScoped<IBusiness<Tienda>, TiendaImp>();

var app = builder.Build();

app.UseCors(OrgienesPermitidos);

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
