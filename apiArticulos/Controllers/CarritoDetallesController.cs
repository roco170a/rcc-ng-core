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
    public class CarritoDetallesController : ControllerBase
    {
        private readonly apiArticulosContext _context;

        public CarritoDetallesController(apiArticulosContext context)
        {
            _context = context;
        }

        // GET: api/CarritoDetalles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarritoDetalle>>> GetCarritoDetalle()
        {
          if (_context.CarritoDetalle == null)
          {
              return NotFound();
          }
            return await _context.CarritoDetalle.ToListAsync();
        }

        // GET: api/CarritoDetalles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarritoDetalle>> GetCarritoDetalle(int id)
        {
          if (_context.CarritoDetalle == null)
          {
              return NotFound();
          }
            var carritoDetalle = await _context.CarritoDetalle.FindAsync(id);

            if (carritoDetalle == null)
            {
                return NotFound();
            }

            return carritoDetalle;
        }

        // PUT: api/CarritoDetalles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarritoDetalle(int id, CarritoDetalle carritoDetalle)
        {
            if (id != carritoDetalle.Id)
            {
                return BadRequest();
            }

            _context.Entry(carritoDetalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarritoDetalleExists(id))
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

        // POST: api/CarritoDetalles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarritoDetalle>> PostCarritoDetalle(CarritoDetalle carritoDetalle)
        {
          if (_context.CarritoDetalle == null)
          {
              return Problem("Entity set 'apiArticulosContext.CarritoDetalle'  is null.");
          }
            _context.CarritoDetalle.Add(carritoDetalle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarritoDetalle", new { id = carritoDetalle.Id }, carritoDetalle);
        }

        // DELETE: api/CarritoDetalles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarritoDetalle(int id)
        {
            if (_context.CarritoDetalle == null)
            {
                return NotFound();
            }
            var carritoDetalle = await _context.CarritoDetalle.FindAsync(id);
            if (carritoDetalle == null)
            {
                return NotFound();
            }

            _context.CarritoDetalle.Remove(carritoDetalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarritoDetalleExists(int id)
        {
            return (_context.CarritoDetalle?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
