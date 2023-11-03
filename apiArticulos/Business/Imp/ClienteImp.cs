using apiArticulos.Data;
using apiArticulos.Entities;

namespace apiArticulos.Business.Imp
{
    public class ClienteImp:IBusiness<Cliente>
    {
        private apiArticulosContext _instance;

        public ClienteImp(apiArticulosContext instance)
        {
            _instance = instance;
        }

        public bool delOne(int id)
        {
            Cliente ItemtoDelete = _instance.Cliente.Find(id);
            _instance.Cliente.Remove(ItemtoDelete);
            _instance.SaveChanges();
            return true;
        }

        public List<Cliente> getall()
        {
            List<Cliente> data = _instance.Cliente.ToList();
            return data;
        }

        public Cliente? getOne(int id)
        {
            Cliente data = _instance.Cliente.Find(id);
            return data;
        }

        public void save(Cliente newItem)
        {
            _instance.Cliente.Add(newItem);
            _instance.SaveChanges();
        }

        public Cliente updOne(int rowId, Cliente itemToUpd)
        {
            throw new NotImplementedException();
        }
    }
}
