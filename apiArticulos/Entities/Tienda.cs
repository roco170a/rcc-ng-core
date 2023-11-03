using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class Tienda
    {
        [Key]
        public int Id { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
    }
}
