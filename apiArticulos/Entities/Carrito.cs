using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class Carrito
    {
        [Key]
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public string Envio { get; set; }
    }
}
