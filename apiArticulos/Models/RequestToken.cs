namespace apiArticulos.Models
{
    public class RequestToken
    {
        public string account { get; set; }
        public string partner { get; set; }
        public string clientid { get; set; }
        public string credential { get; set; }
    }

    public class DataToken
    {
        public string jwt { get; set; }
    }

    public class DataError
    {
        public string status { get; set; }
        public string source { get; set; }
        public string title { get; set; }
        public string detail { get; set; }
    }

    public class DataMeta
    {
        public string version { get; set; }
        public int numItems { get; set; }
        public int numErrors { get; set; }
    }

}
