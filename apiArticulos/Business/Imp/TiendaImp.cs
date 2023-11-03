using apiArticulos.Business;
using apiArticulos.Data;
using apiArticulos.Entities;
using Microsoft.EntityFrameworkCore;

namespace apiTiendas.Business.Imp
{
    public class TiendaImp : IBusiness<Tienda>
    {
        private apiArticulosContext _instance;

        public TiendaImp(apiArticulosContext instance)
        {
            _instance = instance;
        }

        public bool delOne(int id)
        {
            Tienda ItemtoDelete = _instance.Tienda.Find(id);
            _instance.Tienda.Remove(ItemtoDelete);
            _instance.SaveChanges();
            return true;
        }

        public List<Tienda> getall()
        {
            List<Tienda> data = _instance.Tienda.ToList();
            return data;
        }

        public Tienda? getOne(int id)
        {
            Tienda data = _instance.Tienda.Find(id);
            return data;
        }

        public void save(Tienda newItem)
        {
            _instance.Tienda.Add(newItem);
            _instance.SaveChanges();
        }

        public Tienda updOne(int rowId, Tienda itemToUpd)
        {
            throw new NotImplementedException();
        }
    }


}
