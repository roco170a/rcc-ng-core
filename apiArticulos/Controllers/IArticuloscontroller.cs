using apiArticulos.Business;
using apiArticulos.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace apiArticulos.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class IArticuloscontroller : ControllerBase
    {
        private IBusiness<Articulo> _instance;
        public IArticuloscontroller(IBusiness<Articulo> instance)
        {
            _instance = instance;
        }

        // GET: api/<IArticuloscontroller>
        [HttpGet]
        public IEnumerable<Articulo> Get()
        {
            return _instance.getall();
        }

        // GET api/<IArticuloscontroller>/5
        [HttpGet("{id}")]
        public Articulo Get(int id)
        {
            return _instance.getOne(id);
        }

        // POST api/<IArticuloscontroller>
        [HttpPost]
        public void Post([FromBody] Articulo value)
        {
            _instance.save(value);
        }

        // PUT api/<IArticuloscontroller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<IArticuloscontroller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _instance.delOne(id);
        }
    }
}
