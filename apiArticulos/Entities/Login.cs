using System.ComponentModel.DataAnnotations;

namespace apiArticulos.Entities
{
    public class Login
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Passwword { get; set; }
    }
}
