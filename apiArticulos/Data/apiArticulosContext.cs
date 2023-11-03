using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using apiArticulos.Entities;

namespace apiArticulos.Data
{
    public class apiArticulosContext : DbContext
    {
        public apiArticulosContext (DbContextOptions<apiArticulosContext> options)
            : base(options)
        {
        }

        public DbSet<apiArticulos.Entities.Articulo> Articulo { get; set; } = default!;

        public DbSet<apiArticulos.Entities.Carrito> Carrito { get; set; } = default!;

        public DbSet<apiArticulos.Entities.CarritoDetalle> CarritoDetalle { get; set; } = default!;

        public DbSet<apiArticulos.Entities.Cliente> Cliente { get; set; } = default!;

        public DbSet<apiArticulos.Entities.ClienteArticulo> ClienteArticulo { get; set; } = default!;

        public DbSet<apiArticulos.Entities.Login> Login { get; set; } = default!;

        public DbSet<apiArticulos.Entities.Tienda> Tienda { get; set; } = default!;

        public DbSet<apiArticulos.Entities.TiendaArticulo> TiendaArticulo { get; set; } = default!;
    }
}
