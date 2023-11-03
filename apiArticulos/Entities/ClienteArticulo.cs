using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class ClienteArticulo
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int IdCliente { get; set; }
        public int IdArticulo { get; set; }

    }
}
