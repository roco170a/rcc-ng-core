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
    public class TiendaArticulosController : ControllerBase
    {
        private readonly apiArticulosContext _context;

        public TiendaArticulosController(apiArticulosContext context)
        {
            _context = context;
        }

        // GET: api/TiendaArticulos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiendaArticulo>>> GetTiendaArticulo()
        {
          if (_context.TiendaArticulo == null)
          {
              return NotFound();
          }
            return await _context.TiendaArticulo.ToListAsync();
        }

        // GET: api/TiendaArticulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiendaArticulo>> GetTiendaArticulo(int id)
        {
          if (_context.TiendaArticulo == null)
          {
              return NotFound();
          }
            var tiendaArticulo = await _context.TiendaArticulo.FindAsync(id);

            if (tiendaArticulo == null)
            {
                return NotFound();
            }

            return tiendaArticulo;
        }

        // PUT: api/TiendaArticulos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiendaArticulo(int id, TiendaArticulo tiendaArticulo)
        {
            if (id != tiendaArticulo.Id)
            {
                return BadRequest();
            }

            _context.Entry(tiendaArticulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiendaArticuloExists(id))
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

        // POST: api/TiendaArticulos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TiendaArticulo>> PostTiendaArticulo(TiendaArticulo tiendaArticulo)
        {
          if (_context.TiendaArticulo == null)
          {
              return Problem("Entity set 'apiArticulosContext.TiendaArticulo'  is null.");
          }
            _context.TiendaArticulo.Add(tiendaArticulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiendaArticulo", new { id = tiendaArticulo.Id }, tiendaArticulo);
        }

        // DELETE: api/TiendaArticulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiendaArticulo(int id)
        {
            if (_context.TiendaArticulo == null)
            {
                return NotFound();
            }
            var tiendaArticulo = await _context.TiendaArticulo.FindAsync(id);
            if (tiendaArticulo == null)
            {
                return NotFound();
            }

            _context.TiendaArticulo.Remove(tiendaArticulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TiendaArticuloExists(int id)
        {
            return (_context.TiendaArticulo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
