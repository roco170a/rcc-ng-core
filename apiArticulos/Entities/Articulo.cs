
using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class Articulo
    {
        [Key]
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }

        public decimal Precio { get; set; }
        public string Imagen { get; set; }
        public int Stock { get; set; }
    }
}
