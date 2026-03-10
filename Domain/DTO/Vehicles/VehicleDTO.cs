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
        public int Make_ID { get; set; }
        public string Make_Name { get; set; }
    }

    public class ModelDTO
    {
        public int Make_ID { get; set; }
        public string Make_Name { get; set; }
        public int Model_ID { get; set; }
        public string Model_Name { get; set; }
    }
    public class ModelByYearDTO
    {
        public int Make_ID { get; set; }
        public string Make_Name { get; set; }
        public int Model_ID { get; set; }
        public string Model_Name { get; set; }
    }
}