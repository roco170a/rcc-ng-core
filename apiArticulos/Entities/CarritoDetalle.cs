using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class CarritoDetalle
    {
        [Key]
        public int Id { get; set; }
        public int IdCarrito { get; set; }
        public int IdTiendaArticulo { get; set; }
        public int Cantidad { get; set; }
        public decimal Total { get; set; }
    }
}
