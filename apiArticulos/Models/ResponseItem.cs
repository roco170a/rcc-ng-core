namespace apiArticulos.Models
{
    public class ResponseItem<T>
    {
        public DataMeta meta { get; set; }
        public T data { get; set; }
        public List<DataError> errors { get; set; }
    }

    
    public class DataItem
    {
        public string account { get; set; }
        public string domain { get; set; }
        public string objectType { get; set; }
        public List<AttributeItem> attributes { get; set; }
    }

    
    public class AttributeItem
    {
        public string Entity { get; set; }
        public string FieldName { get; set; }
        public string Value { get; set; }
        public string DataType { get; set; }
    }
}