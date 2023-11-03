using apiArticulos.Data;
using apiArticulos.Entities;
using Microsoft.EntityFrameworkCore;

namespace apiArticulos.Business.Imp
{
    public class ArticuloImp : IBusiness<Articulo>
    {
        private apiArticulosContext _instance;

        public ArticuloImp(apiArticulosContext instance)
        {
            _instance = instance;
        }

        public bool delOne(int id)
        {
            Articulo ItemtoDelete = _instance.Articulo.Find(id);
            _instance.Articulo.Remove(ItemtoDelete);
            _instance.SaveChanges();
            return true;
        }

        public List<Articulo> getall()
        {
            List<Articulo> data = _instance.Articulo.ToList();
            return data;
        }

        public Articulo? getOne(int id)
        {
            Articulo data = _instance.Articulo.Find(id);
            return data;
        }

        public void save(Articulo newItem)
        {
            _instance.Articulo.Add(newItem);
            _instance.SaveChanges();
        }

        public Articulo updOne(int rowId, Articulo itemToUpd)
        {
            throw new NotImplementedException();
        }
    }
}
