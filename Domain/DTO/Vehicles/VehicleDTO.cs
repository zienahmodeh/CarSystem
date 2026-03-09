using System.Collections.Generic;

namespace DTO
{
    public class NhtsaResponse<T>
    {
        public int Count { get; set; }
        public string Message { get; set; }
        public List<T> Results { get; set; }
    }

    public class MakeDTO
    {
        public int MakeID { get; set; }
        public string MakeName { get; set; }
    }

    public class ModelDTO
    {
        public int MakeID { get; set; }
        public string MakeName { get; set; }
        public int ModelID { get; set; }
        public string ModelName { get; set; }
    }
}