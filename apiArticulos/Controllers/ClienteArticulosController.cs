using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiArticulos.Data;
using apiArticulos.Entities;

namespace apiArticulos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteArticulosController : ControllerBase
    {
        private readonly apiArticulosContext _context;

        public ClienteArticulosController(apiArticulosContext context)
        {
            _context = context;
        }

        // GET: api/ClienteArticulos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteArticulo>>> GetClienteArticulo()
        {
          if (_context.ClienteArticulo == null)
          {
              return NotFound();
          }
            return await _context.ClienteArticulo.ToListAsync();
        }

        // GET: api/ClienteArticulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteArticulo>> GetClienteArticulo(int id)
        {
          if (_context.ClienteArticulo == null)
          {
              return NotFound();
          }
            var clienteArticulo = await _context.ClienteArticulo.FindAsync(id);

            if (clienteArticulo == null)
            {
                return NotFound();
            }

            return clienteArticulo;
        }

        // PUT: api/ClienteArticulos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClienteArticulo(int id, ClienteArticulo clienteArticulo)
        {
            if (id != clienteArticulo.Id)
            {
                return BadRequest();
            }

            _context.Entry(clienteArticulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteArticuloExists(id))
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

        // POST: api/ClienteArticulos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClienteArticulo>> PostClienteArticulo(ClienteArticulo clienteArticulo)
        {
          if (_context.ClienteArticulo == null)
          {
              return Problem("Entity set 'apiArticulosContext.ClienteArticulo'  is null.");
          }
            _context.ClienteArticulo.Add(clienteArticulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClienteArticulo", new { id = clienteArticulo.Id }, clienteArticulo);
        }

        // DELETE: api/ClienteArticulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClienteArticulo(int id)
        {
            if (_context.ClienteArticulo == null)
            {
                return NotFound();
            }
            var clienteArticulo = await _context.ClienteArticulo.FindAsync(id);
            if (clienteArticulo == null)
            {
                return NotFound();
            }

            _context.ClienteArticulo.Remove(clienteArticulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteArticuloExists(int id)
        {
            return (_context.ClienteArticulo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
