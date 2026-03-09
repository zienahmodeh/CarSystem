using System;

namespace DTO
{
    public class LogDataForList: BaseDTO
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public string Level { get; set; } = null!;

        public string Message { get; set; }

        public string Exception { get; set; }

        public string Source { get; set; }
    }
}
