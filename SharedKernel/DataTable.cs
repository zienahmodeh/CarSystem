using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SharedKernel
{
    [NotMapped]
    public class DataTable<T>
    {
        public IEnumerable<T> Data { get; set; }
        public decimal Count { get; set; }
    }
}
