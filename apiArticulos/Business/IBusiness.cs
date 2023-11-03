using apiArticulos.Entities;

namespace apiArticulos.Business
{
    public interface IBusiness<T>
    {
        void save(T newItem);
        public List<T> getall();
        public T? getOne(int id);
        public Boolean delOne(int id);
        public T updOne(int rowId, T itemToUpd);
    }
}
