using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiArticulos.Data;
using apiArticulos.Entities;
using apiArticulos.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace apiArticulos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly apiArticulosContext _context;

        public LoginsController(apiArticulosContext context)
        {
            _context = context;
        }

        [HttpPost("Token")]
        public ResponseItem<DataToken> postToken(Login userData)
        {
            ResponseItem<DataToken> resp1 = new ResponseItem<DataToken>();
            resp1.meta = new DataMeta() { version = "1.0", numItems = 0, numErrors = 0 };
            resp1.errors = new List<DataError>();

            if (userData != null)
            {
                if (_context.Login.Where( R => R.UserName == userData.UserName && R.Passwword == userData.Passwword).FirstOrDefault() != null)
                {
                    var issuer = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Jwt")["Issuer"];  //builder.Configuration["Jwt:Issuer"];
                    var audience = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Jwt")["Audience"];//builder.Configuration["Jwt:Audience"];
                    var str_key = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Jwt")["Key"];//builder.Configuration["Jwt:Key"];

                    var key = Encoding.ASCII.GetBytes(str_key);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                            new Claim("Id", Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Sub, userData.UserName),
                            new Claim(JwtRegisteredClaimNames.Email, userData.UserName),
                            new Claim(JwtRegisteredClaimNames.UniqueName, userData.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti,
                            Guid.NewGuid().ToString())
                         }),
                        Expires = DateTime.UtcNow.AddMinutes(5),
                        Issuer = issuer,
                        Audience = audience,
                        SigningCredentials = new SigningCredentials
                        (new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var jwtToken = tokenHandler.WriteToken(token);
                    var stringToken = tokenHandler.WriteToken(token);

                    resp1.data = new DataToken() { jwt = stringToken };
                    resp1.meta.numItems = 1;
                }
                else
                {
                    resp1.errors.Add(new DataError() { status = "401", source = "auth/post", title = "Unauthorized", detail = "Bad User/Password" });
                    resp1.meta.numErrors = 1;
                }
            }
            else
            {
                resp1.errors.Add(new DataError() { status = "204", source = "auth/post", title = "No Content", detail = "Data Required" });
                resp1.meta.numErrors = 1;
            }
            return resp1;
        }

        // GET: api/Logins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin()
        {
          if (_context.Login == null)
          {
              return NotFound();
          }
            return await _context.Login.ToListAsync();
        }

        // GET: api/Logins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
          if (_context.Login == null)
          {
              return NotFound();
          }
            var login = await _context.Login.FindAsync(id);

            if (login == null)
            {
                return NotFound();
            }

            return login;
        }

        // PUT: api/Logins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogin(int id, Login login)
        {
            if (id != login.Id)
            {
                return BadRequest();
            }

            _context.Entry(login).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Logins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Login>> PostLogin(Login login)
        {
          if (_context.Login == null)
          {
              return Problem("Entity set 'apiArticulosContext.Login'  is null.");
          }
            _context.Login.Add(login);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogin", new { id = login.Id }, login);
        }

        // DELETE: api/Logins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogin(int id)
        {
            if (_context.Login == null)
            {
                return NotFound();
            }
            var login = await _context.Login.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }

            _context.Login.Remove(login);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(int id)
        {
            return (_context.Login?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
