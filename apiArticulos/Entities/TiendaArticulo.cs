using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class TiendaArticulo
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int IdTienda { get; set; }
        public int IdArticulo { get; set; }
    }
}
